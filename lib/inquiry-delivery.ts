import { labelFor, budgetRanges, projectTypes, type Inquiry } from "./inquiry";

/**
 * Inquiry delivery adapters (server-side only).
 *
 * Choose a provider with INQUIRY_PROVIDER, or let it be inferred from
 * whichever credentials are present. See .env.example for every variable.
 *
 *   webhook    → any HTTPS endpoint (GoHighLevel inbound webhook, Zapier,
 *                Make, n8n, a Supabase Edge Function, your own API)
 *   formspree  → Formspree form (files forwarded)
 *   hubspot    → HubSpot Forms API
 *   resend     → Email notification via Resend (files attached)
 *   supabase   → Insert a row into a Supabase table via REST
 *   none       → Development only: logs the inquiry to the server console
 */

type Result = { ok: true } | { ok: false; error: string; status?: number };

type Provider = "webhook" | "formspree" | "hubspot" | "resend" | "supabase" | "none";

const env = process.env;

function resolveProvider(): Provider {
  const explicit = env.INQUIRY_PROVIDER as Provider | undefined;
  if (explicit) return explicit;
  if (env.INQUIRY_WEBHOOK_URL) return "webhook";
  if (env.FORMSPREE_FORM_ID) return "formspree";
  if (env.HUBSPOT_PORTAL_ID && env.HUBSPOT_FORM_ID) return "hubspot";
  if (env.RESEND_API_KEY && env.INQUIRY_EMAIL_TO) return "resend";
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) return "supabase";
  return "none";
}

function toPayload(data: Inquiry) {
  return {
    ...data,
    projectTypeLabel: labelFor(projectTypes, data.projectType),
    budgetLabel: data.budget ? labelFor(budgetRanges, data.budget) : "",
    submittedAt: new Date().toISOString(),
    source: "crate-construction-website",
  };
}

function toText(data: Inquiry) {
  const p = toPayload(data);
  return [
    `New project inquiry — ${p.projectTypeLabel}`,
    "",
    `Name: ${p.firstName} ${p.lastName}`,
    `Email: ${p.email}`,
    `Phone: ${p.phone}`,
    `Location: ${p.location}`,
    `Budget: ${p.budgetLabel || "Not specified"}`,
    `Desired start: ${p.startDate || "Not specified"}`,
    "",
    p.message,
  ].join("\n");
}

async function failed(res: Response, provider: string): Promise<Result> {
  const detail = await res.text().catch(() => "");
  console.error(`[inquiry] ${provider} responded ${res.status}: ${detail.slice(0, 500)}`);
  return { ok: false, status: 502, error: "We couldn't send your inquiry right now." };
}

export async function deliverInquiry(data: Inquiry, files: File[]): Promise<Result> {
  const provider = resolveProvider();

  try {
    switch (provider) {
      case "webhook": {
        const res = await fetch(env.INQUIRY_WEBHOOK_URL!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(env.INQUIRY_WEBHOOK_SECRET ? { Authorization: `Bearer ${env.INQUIRY_WEBHOOK_SECRET}` } : {}),
          },
          body: JSON.stringify({
            ...toPayload(data),
            attachments: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
          }),
        });
        return res.ok ? { ok: true } : failed(res, "webhook");
      }

      case "formspree": {
        const form = new FormData();
        Object.entries(toPayload(data)).forEach(([k, v]) => form.append(k, String(v)));
        form.append("_subject", `New project inquiry — ${labelFor(projectTypes, data.projectType)}`);
        form.append("_replyto", data.email);
        files.forEach((f) => form.append("attachment", f, f.name));
        const res = await fetch(`https://formspree.io/f/${env.FORMSPREE_FORM_ID}`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: form,
        });
        return res.ok ? { ok: true } : failed(res, "formspree");
      }

      case "hubspot": {
        const p = toPayload(data);
        const res = await fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/${env.HUBSPOT_PORTAL_ID}/${env.HUBSPOT_FORM_ID}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: [
                { name: "firstname", value: p.firstName },
                { name: "lastname", value: p.lastName },
                { name: "email", value: p.email },
                { name: "phone", value: p.phone },
                { name: "message", value: toText(data) },
              ],
              context: { pageName: "Start a Project" },
            }),
          },
        );
        return res.ok ? { ok: true } : failed(res, "hubspot");
      }

      case "resend": {
        const attachments = await Promise.all(
          files.map(async (f) => ({
            filename: f.name,
            content: Buffer.from(await f.arrayBuffer()).toString("base64"),
          })),
        );
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.RESEND_API_KEY}` },
          body: JSON.stringify({
            from: env.INQUIRY_EMAIL_FROM ?? "Crate Construction Website <onboarding@resend.dev>",
            to: env.INQUIRY_EMAIL_TO!.split(",").map((s) => s.trim()),
            reply_to: data.email,
            subject: `New project inquiry — ${labelFor(projectTypes, data.projectType)} — ${data.location}`,
            text: toText(data),
            attachments,
          }),
        });
        return res.ok ? { ok: true } : failed(res, "resend");
      }

      case "supabase": {
        const table = env.SUPABASE_INQUIRY_TABLE ?? "inquiries";
        const p = toPayload(data);
        const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: env.SUPABASE_SERVICE_ROLE_KEY!,
            Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            first_name: p.firstName,
            last_name: p.lastName,
            email: p.email,
            phone: p.phone,
            project_type: p.projectType,
            location: p.location,
            budget: p.budget || null,
            start_date: p.startDate || null,
            message: p.message,
            attachment_names: files.map((f) => f.name),
          }),
        });
        return res.ok ? { ok: true } : failed(res, "supabase");
      }

      case "none": {
        if (process.env.NODE_ENV !== "production") {
          console.info("[inquiry] No delivery provider configured — logging submission (development only):");
          console.info(toText(data), files.length ? `\nAttachments: ${files.map((f) => f.name).join(", ")}` : "");
          return { ok: true };
        }
        console.error("[inquiry] No delivery provider configured. Set one in the environment (see .env.example).");
        return { ok: false, status: 503, error: "Online inquiries are temporarily unavailable." };
      }
    }
  } catch (error) {
    console.error(`[inquiry] ${provider} delivery failed`, error);
    return { ok: false, status: 502, error: "We couldn't send your inquiry right now." };
  }
}
