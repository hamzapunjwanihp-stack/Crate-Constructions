"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  budgetRanges,
  FILE_LIMITS,
  labelFor,
  projectTypes,
  validateField,
  validateFiles,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from "@/lib/inquiry";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { ArrowRight, PhoneIcon } from "@/components/ui/Icons";

/**
 * Where submissions go. Defaults to the built-in /api/inquiry route (see
 * lib/inquiry-delivery.ts for Formspree, HubSpot, GoHighLevel, Resend,
 * Supabase, and webhook adapters). Set NEXT_PUBLIC_INQUIRY_ENDPOINT to post
 * straight to a hosted form endpoint instead.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT || "/api/inquiry";

const emptyInquiry: Inquiry = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  budget: "",
  startDate: "",
  message: "",
};

const fieldOrder: (keyof Inquiry | "files")[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "projectType",
  "location",
  "budget",
  "startDate",
  "message",
  "files",
];

type Status = "idle" | "submitting" | "success" | "error";

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const presetType = searchParams.get("type") ?? "";
  const [values, setValues] = useState<Inquiry>(() => ({
    ...emptyInquiry,
    projectType: projectTypes.some((t) => t.value === presetType) ? presetType : "",
  }));
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [today, setToday] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  // Move focus to the confirmation so screen-reader and keyboard users land on it.
  useEffect(() => {
    if (status === "success") successRef.current?.focus({ preventScroll: true });
  }, [status]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setToday(new Date().toISOString().slice(0, 10)));
    return () => cancelAnimationFrame(frame);
  }, []);

  function update(name: keyof Inquiry, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
  }

  function blur(name: keyof Inquiry) {
    const error = validateField(name, values[name]);
    setErrors((e) => ({ ...e, [name]: error }));
  }

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    const next = [...files, ...Array.from(list)].slice(0, FILE_LIMITS.maxFiles + 1);
    const error = validateFiles(next);
    setErrors((e) => ({ ...e, files: error }));
    if (!error) setFiles(next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    setErrors((e) => ({ ...e, files: validateFiles(next) }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const nextErrors: InquiryErrors = validateInquiry(values);
    const fileError = validateFiles(files);
    if (fileError) nextErrors.files = fileError;
    setErrors(nextErrors);

    const firstInvalid = fieldOrder.find((key) => nextErrors[key]);
    if (firstInvalid) {
      summaryRef.current?.focus();
      return;
    }

    const honeypot = formRef.current?.querySelector<HTMLInputElement>('input[name="company"]')?.value ?? "";
    const data = new FormData();
    (Object.keys(values) as (keyof Inquiry)[]).forEach((key) => data.append(key, values[key].trim()));
    data.append("projectTypeLabel", labelFor(projectTypes, values.projectType));
    if (values.budget) data.append("budgetLabel", labelFor(budgetRanges, values.budget));
    data.append("company", honeypot);
    files.forEach((file) => data.append("files", file, file.name));

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (body?.errors) setErrors(body.errors);
        throw new Error(body?.error || "We couldn't send your inquiry.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "We couldn't send your inquiry.");
    }
  }

  const errorList = fieldOrder.filter((key) => errors[key]);

  const inputClass = (name: keyof Inquiry) =>
    cn(
      "peer w-full appearance-none rounded-none border-0 border-b bg-transparent px-0 py-3 text-[1.0625rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-300 focus:outline-none",
      errors[name]
        ? "border-accent-ink shadow-[0_1px_0_0_var(--brand-accent-ink)]"
        : "border-ink/25 hover:border-ink/50 focus:border-ink focus:shadow-[0_1px_0_0_var(--brand-ink)]",
    );

  const fieldError = (name: keyof Inquiry | "files") =>
    errors[name] ? (
      <p id={id(`${name}-error`)} className="mt-2 flex items-center gap-2 text-sm text-accent-ink">
        <span aria-hidden="true" className="inline-block size-1.5 bg-accent-ink" />
        {errors[name]}
      </p>
    ) : null;

  const describedBy = (name: keyof Inquiry, hint?: boolean) =>
    [errors[name] ? id(`${name}-error`) : null, hint ? id(`${name}-hint`) : null].filter(Boolean).join(" ") ||
    undefined;

  const fieldLabel = (name: string, children: React.ReactNode, optional = false) => (
    <label htmlFor={id(name)} className="block label-mono text-muted">
      {children}
      {optional ? (
        <span className="ml-2 normal-case tracking-normal text-muted">(optional)</span>
      ) : (
        <span className="text-accent-ink"> *</span>
      )}
    </label>
  );

  return (
    <>
      {status === "success" ? (
        <div className="border-t border-ink pt-10 animate-fade-up" role="status">
          <span
            aria-hidden="true"
            className="block h-px origin-left bg-accent animate-draw-x [animation-delay:200ms]"
          />
          <p className="mt-10 label-mono text-muted">Inquiry received</p>
          <h2 ref={successRef} tabIndex={-1} className="mt-6 heading-xl outline-none">
            Thank you, {values.firstName.trim() || "and welcome"}.
          </h2>
          <p className="mt-8 max-w-[46ch] body-lg text-charcoal">
            Your project details are in. We&apos;ll review them and reach out to set up a first conversation about what
            you&apos;re planning.
          </p>

          <dl className="mt-12 grid gap-6 border-t border-ink/15 pt-8 sm:grid-cols-3">
            <div>
              <dt className="label-mono text-muted">Project</dt>
              <dd className="mt-2 heading-sm">{labelFor(projectTypes, values.projectType)}</dd>
            </div>
            <div>
              <dt className="label-mono text-muted">Location</dt>
              <dd className="mt-2 heading-sm">{values.location}</dd>
            </div>
            <div>
              <dt className="label-mono text-muted">Budget</dt>
              <dd className="mt-2 heading-sm">
                {values.budget ? labelFor(budgetRanges, values.budget) : "Not specified"}
              </dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Link
              href="/projects"
              className="group inline-flex min-h-[3.25rem] items-center gap-3 bg-ink px-7 label-caps text-bone"
            >
              View our work
              <ArrowRight className="transition-transform duration-500 ease-expo group-hover:translate-x-1" />
            </Link>
            <a href={site.phone.href} className="inline-flex items-center gap-2 text-charcoal hover:text-ink">
              <PhoneIcon className="text-accent" />
              Need to talk sooner? {site.phone.display}
            </a>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          aria-describedby={id("required-note")}
          className="space-y-16"
        >
          <p id={id("required-note")} className="label-mono text-muted">
            Fields marked <span className="text-accent-ink">*</span> are required.
          </p>

          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            aria-live="assertive"
            className={cn("outline-none", errorList.length === 0 && status !== "error" && "hidden")}
          >
            {errorList.length > 0 && (
              <div className="border-l-2 border-accent-ink bg-white px-5 py-4">
                <p className="font-medium text-ink">
                  Please check {errorList.length === 1 ? "one field" : `${errorList.length} fields`}:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {errorList.map((key) => (
                    <li key={key}>
                      <a
                        href={`#${id(key === "files" ? "files" : key)}`}
                        className="text-accent-ink underline underline-offset-4"
                      >
                        {errors[key]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {status === "error" && serverError && errorList.length === 0 && (
              <div className="border-l-2 border-accent-ink bg-white px-5 py-4">
                <p className="font-medium text-ink">{serverError}</p>
                <p className="mt-1 text-sm text-charcoal">
                  Please try again, or call us directly at{" "}
                  <a href={site.phone.href} className="underline underline-offset-4">
                    {site.phone.display}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>

          {/* Honeypot — hidden from people, tempting to bots */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={id("company")}>Company</label>
            <input id={id("company")} name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/* 01 — About you */}
          <fieldset>
            <legend className="flex w-full items-center gap-4 border-b border-ink pb-4">
              <span className="font-mono text-xs text-muted">01</span>
              <span className="heading-md">About you</span>
            </legend>
            <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <div>
                {fieldLabel("firstName", "First name")}
                <input
                  id={id("firstName")}
                  name="firstName"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  onBlur={() => blur("firstName")}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={describedBy("firstName")}
                  aria-required="true"
                  className={inputClass("firstName")}
                />
                {fieldError("firstName")}
              </div>
              <div>
                {fieldLabel("lastName", "Last name")}
                <input
                  id={id("lastName")}
                  name="lastName"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  onBlur={() => blur("lastName")}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={describedBy("lastName")}
                  aria-required="true"
                  className={inputClass("lastName")}
                />
                {fieldError("lastName")}
              </div>
              <div>
                {fieldLabel("email", "Email")}
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  onBlur={() => blur("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                  aria-required="true"
                  className={inputClass("email")}
                />
                {fieldError("email")}
              </div>
              <div>
                {fieldLabel("phone", "Phone")}
                <input
                  id={id("phone")}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  onBlur={() => blur("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={describedBy("phone")}
                  aria-required="true"
                  className={inputClass("phone")}
                />
                {fieldError("phone")}
              </div>
            </div>
          </fieldset>

          {/* 02 — The project */}
          <fieldset>
            <legend className="flex w-full items-center gap-4 border-b border-ink pb-4">
              <span className="font-mono text-xs text-muted">02</span>
              <span className="heading-md">The project</span>
            </legend>

            <div className="mt-8 space-y-10">
              <fieldset
                id={id("projectType")}
                tabIndex={-1}
                aria-invalid={!!errors.projectType}
                aria-describedby={errors.projectType ? id("projectType-error") : undefined}
                className="outline-none"
              >
                <legend className="label-mono text-muted">
                  Project type<span className="text-accent-ink"> *</span>
                </legend>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                  {projectTypes.map((t, i) => (
                    <label
                      key={t.value}
                      className={cn(
                        "group relative flex min-h-14 cursor-pointer items-center justify-between gap-3 border px-4 py-3 text-[0.9875rem] transition-colors duration-300",
                        "has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-bone has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                        errors.projectType ? "border-accent-ink/60" : "border-ink/20 hover:border-ink/60",
                      )}
                    >
                      <input
                        type="radio"
                        name="projectType"
                        value={t.value}
                        checked={values.projectType === t.value}
                        onChange={(e) => update("projectType", e.target.value)}
                        className="sr-only"
                      />
                      <span>{t.label}</span>
                      <span aria-hidden="true" className="font-mono text-[0.625rem] opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </label>
                  ))}
                </div>
                {fieldError("projectType")}
              </fieldset>

              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                <div>
                  {fieldLabel("location", "Project location")}
                  <input
                    id={id("location")}
                    name="location"
                    autoComplete="address-level2"
                    placeholder="Neighborhood or city"
                    value={values.location}
                    onChange={(e) => update("location", e.target.value)}
                    onBlur={() => blur("location")}
                    aria-invalid={!!errors.location}
                    aria-describedby={describedBy("location")}
                    aria-required="true"
                    className={inputClass("location")}
                  />
                  {fieldError("location")}
                </div>
                <div>
                  {fieldLabel("startDate", "Desired start date", true)}
                  <input
                    id={id("startDate")}
                    name="startDate"
                    type="date"
                    min={today}
                    value={values.startDate}
                    onChange={(e) => update("startDate", e.target.value)}
                    onBlur={() => blur("startDate")}
                    aria-invalid={!!errors.startDate}
                    aria-describedby={describedBy("startDate")}
                    className={cn(inputClass("startDate"), "min-h-[3.25rem]")}
                  />
                  {fieldError("startDate")}
                </div>
              </div>

              <fieldset id={id("budget")} tabIndex={-1} className="outline-none">
                <legend className="label-mono text-muted">
                  Estimated budget<span className="ml-2 normal-case tracking-normal text-muted">(optional)</span>
                </legend>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {budgetRanges.map((b) => (
                    <label
                      key={b.value}
                      className="relative flex min-h-14 cursor-pointer items-center border border-ink/20 px-4 py-3 text-[0.9875rem] transition-colors duration-300 hover:border-ink/60 has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-bone has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={b.value}
                        checked={values.budget === b.value}
                        onChange={(e) => update("budget", e.target.value)}
                        className="sr-only"
                      />
                      {b.label}
                    </label>
                  ))}
                </div>
                {fieldError("budget")}
              </fieldset>
            </div>
          </fieldset>

          {/* 03 — Details */}
          <fieldset>
            <legend className="flex w-full items-center gap-4 border-b border-ink pb-4">
              <span className="font-mono text-xs text-muted">03</span>
              <span className="heading-md">Details</span>
            </legend>

            <div className="mt-8 space-y-10">
              <div>
                {fieldLabel("message", "Tell us about your project")}
                <textarea
                  id={id("message")}
                  name="message"
                  rows={6}
                  placeholder="What are you planning? Scope, timing, the condition of the home, and anything you're unsure about."
                  value={values.message}
                  onChange={(e) => update("message", e.target.value)}
                  onBlur={() => blur("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy("message", true)}
                  aria-required="true"
                  className={cn(inputClass("message"), "resize-y leading-relaxed")}
                />
                <div className="mt-2 flex justify-between gap-4">
                  {fieldError("message")}
                  <p id={id("message-hint")} className="ml-auto mt-2 font-mono text-xs text-muted">
                    {values.message.trim().length} / 5000
                  </p>
                </div>
              </div>

              <div>
                <p id={id("files-label")} className="label-mono text-muted">
                  Plans, inspiration &amp; documents
                  <span className="ml-2 normal-case tracking-normal text-muted">(optional)</span>
                </p>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    addFiles(e.dataTransfer.files);
                  }}
                  className={cn(
                    "mt-4 flex flex-col items-start gap-4 border border-dashed px-6 py-8 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between",
                    dragging ? "border-ink bg-white" : errors.files ? "border-accent-ink" : "border-ink/30",
                  )}
                >
                  <div>
                    <p className="text-ink">Drag files here, or browse.</p>
                    <p id={id("files-hint")} className="mt-1 text-sm text-muted">
                      PDF, images, DWG, or Word · up to {FILE_LIMITS.maxFiles} files, 10 MB each
                    </p>
                  </div>
                  <label
                    htmlFor={id("files")}
                    className="inline-flex min-h-11 cursor-pointer items-center border border-ink px-5 label-caps text-[0.75rem] transition-colors hover:bg-ink hover:text-bone has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
                  >
                    Browse files
                    <input
                      ref={fileInputRef}
                      id={id("files")}
                      type="file"
                      multiple
                      accept={FILE_LIMITS.accept}
                      onChange={(e) => addFiles(e.target.files)}
                      aria-describedby={[id("files-hint"), errors.files ? id("files-error") : ""]
                        .filter(Boolean)
                        .join(" ")}
                      className="sr-only"
                    />
                  </label>
                </div>
                {fieldError("files")}
                {files.length > 0 && (
                  <ul className="mt-4 border-t border-ink/15" aria-label="Attached files">
                    {files.map((file, i) => (
                      <li
                        key={`${file.name}-${i}`}
                        className="flex items-center justify-between gap-4 border-b border-ink/15 py-3 text-sm"
                      >
                        <span className="min-w-0 truncate">
                          {file.name}{" "}
                          <span className="ml-2 font-mono text-xs text-muted">{formatBytes(file.size)}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="shrink-0 py-1 label-mono text-muted underline-offset-4 hover:text-ink hover:underline"
                        >
                          Remove<span className="sr-only"> {file.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </fieldset>

          <div className="flex flex-col gap-6 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[44ch] text-sm text-muted">
              By submitting, you agree to be contacted about your project. See our{" "}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
                Privacy Policy
              </Link>
              .
            </p>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group relative inline-flex min-h-[3.5rem] shrink-0 items-center justify-center gap-3 overflow-hidden bg-ink px-8 label-caps text-bone disabled:cursor-wait"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-expo group-hover:scale-y-100 group-focus-visible:scale-y-100"
              />
              <span className="relative flex items-center gap-3">
                {status === "submitting" ? "Sending…" : "Submit project"}
                <ArrowRight className="transition-transform duration-500 ease-expo group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </form>
      )}
    </>
  );
}
