/**
 * Server-only staff alert recipients.
 * Do not import this module from 'use client' components.
 */
const STAFF_INBOX = "info@1stcalluk.com";
const STAFF_COPY = "getu4ever@gmail.com";

function cleanEnv(value: string | undefined | null): string {
  return (value || "").trim().replace(/^['"]+|['"]+$/g, "").trim();
}

export function staffToEmail(): string {
  return (
    cleanEnv(process.env.ENQUIRY_TO_EMAIL) ||
    cleanEnv(process.env.ADMIN_NOTIFY_EMAIL) ||
    STAFF_INBOX
  );
}

export function staffCopyEmail(): string {
  return (
    cleanEnv(process.env.ENQUIRY_NOTIFY_EMAIL) ||
    cleanEnv(process.env.ADMIN_COPY_EMAIL) ||
    STAFF_COPY
  );
}

export function staffFromEmail(siteName: string): string {
  return (
    cleanEnv(process.env.ENQUIRY_FROM_EMAIL) ||
    cleanEnv(process.env.EMAIL_FROM) ||
    `${siteName} <${STAFF_INBOX}>`
  );
}

export function staffBccEmail(to: string): string | undefined {
  const copy = staffCopyEmail();
  if (!copy || copy.toLowerCase() === to.toLowerCase()) return undefined;
  return copy;
}

export const PUBLIC_CONTACT_EMAIL = STAFF_INBOX;
