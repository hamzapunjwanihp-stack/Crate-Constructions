import { validateFiles, validateInquiry, type Inquiry } from "@/lib/inquiry";
import { deliverInquiry } from "@/lib/inquiry-delivery";

/** Project inquiry endpoint — validates on the server, then hands off to the configured provider. */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Accept quietly and drop.
  if (String(form.get("company") ?? "").trim()) {
    return Response.json({ ok: true });
  }

  const field = (name: keyof Inquiry) => String(form.get(name) ?? "").trim();
  const data: Inquiry = {
    firstName: field("firstName"),
    lastName: field("lastName"),
    email: field("email"),
    phone: field("phone"),
    projectType: field("projectType"),
    location: field("location"),
    budget: field("budget"),
    startDate: field("startDate"),
    message: field("message"),
  };

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  const errors = validateInquiry(data);
  const fileError = validateFiles(files);
  if (fileError) errors.files = fileError;

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors, error: "Please review the highlighted fields." }, { status: 422 });
  }

  const result = await deliverInquiry(data, files);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: result.status ?? 502 });
  }

  return Response.json({ ok: true });
}
