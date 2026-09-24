/**
 * Project inquiry schema — shared by the client form and the API route
 * so validation rules live in exactly one place.
 */

export const projectTypes = [
  { value: "new-home", label: "New Home" },
  { value: "whole-home-remodel", label: "Whole Home Remodel" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "addition", label: "Addition" },
  { value: "renovation", label: "Renovation" },
  { value: "other", label: "Other" },
] as const;

export type ProjectTypeValue = (typeof projectTypes)[number]["value"];

export const budgetRanges = [
  { value: "under-100k", label: "Under $100K" },
  { value: "100k-250k", label: "$100K–$250K" },
  { value: "250k-500k", label: "$250K–$500K" },
  { value: "500k-plus", label: "$500K+" },
  { value: "not-sure", label: "Not Sure Yet" },
] as const;

export type BudgetValue = (typeof budgetRanges)[number]["value"];

export type Inquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  startDate: string;
  message: string;
};

export type InquiryErrors = Partial<Record<keyof Inquiry | "files", string>>;

/**
 * Upload limits. Note: many serverless hosts cap request bodies (Vercel:
 * ~4.5 MB for route handlers). For larger plan sets, point
 * NEXT_PUBLIC_INQUIRY_ENDPOINT at a form service that accepts files
 * directly (e.g. Formspree), or upload to storage first.
 */
export const FILE_LIMITS = {
  maxFiles: 5,
  maxBytes: 10 * 1024 * 1024,
  maxTotalBytes: 20 * 1024 * 1024,
  accept: ".pdf,.jpg,.jpeg,.png,.heic,.webp,.dwg,.doc,.docx",
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(name: keyof Inquiry, raw: string): string | undefined {
  const value = raw.trim();
  switch (name) {
    case "firstName":
      return value ? undefined : "Please enter your first name.";
    case "lastName":
      return value ? undefined : "Please enter your last name.";
    case "email":
      if (!value) return "Please enter your email address.";
      return EMAIL_RE.test(value) ? undefined : "Please enter a valid email address.";
    case "phone": {
      if (!value) return "Please enter a phone number.";
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15
        ? undefined
        : "Please enter a valid phone number, including area code.";
    }
    case "projectType":
      return projectTypes.some((t) => t.value === value) ? undefined : "Please choose a project type.";
    case "location":
      return value ? undefined : "Let us know where the project is located.";
    case "budget":
      if (!value) return undefined;
      return budgetRanges.some((b) => b.value === value) ? undefined : "Please choose a budget range.";
    case "startDate":
      if (!value) return undefined;
      return /^\d{4}-\d{2}-\d{2}$/.test(value) ? undefined : "Please choose a valid date.";
    case "message":
      if (!value) return "Tell us a little about your project.";
      if (value.length < 20) return "A little more detail helps — at least 20 characters.";
      return value.length > 5000 ? "Please keep this under 5,000 characters." : undefined;
  }
}

export function validateInquiry(data: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  (Object.keys(data) as (keyof Inquiry)[]).forEach((key) => {
    const error = validateField(key, data[key] ?? "");
    if (error) errors[key] = error;
  });
  return errors;
}

export function validateFiles(files: File[]): string | undefined {
  if (files.length > FILE_LIMITS.maxFiles) return `Please attach up to ${FILE_LIMITS.maxFiles} files.`;
  const tooLarge = files.find((f) => f.size > FILE_LIMITS.maxBytes);
  if (tooLarge) return `"${tooLarge.name}" is larger than 10 MB.`;
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > FILE_LIMITS.maxTotalBytes) return "Attachments must total 20 MB or less.";
  return undefined;
}

export function labelFor<T extends readonly { value: string; label: string }[]>(list: T, value: string) {
  return list.find((item) => item.value === value)?.label ?? value;
}
