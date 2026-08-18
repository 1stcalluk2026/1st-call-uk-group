type PortalEnquiryService = "immigration" | "financial" | "web";
type PortalEnquiryKind = "contact" | "book";

export function mapGroupService(service: string): PortalEnquiryService {
  const value = service.toLowerCase();
  if (value.includes("financial") || value.includes("account") || value.includes("hmrc")) {
    return "financial";
  }
  if (value.includes("web") || value.includes("digital")) {
    return "web";
  }
  return "immigration";
}

export async function forwardPortalEnquiry(input: {
  service: PortalEnquiryService;
  sourceSite: string;
  sourceKind?: PortalEnquiryKind;
  sourceChannel?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
}): Promise<void> {
  const url = process.env.PORTAL_ENQUIRY_URL?.trim();
  const secret = process.env.PORTAL_ENQUIRY_SECRET?.trim();

  if (!url || !secret) {
    console.warn(
      "[portal-enquiry] skipped — set PORTAL_ENQUIRY_URL and PORTAL_ENQUIRY_SECRET",
    );
    return;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        service: input.service,
        sourceSite: input.sourceSite,
        sourceKind: input.sourceKind ?? "contact",
        sourceChannel: input.sourceChannel ?? null,
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        company: input.company ?? null,
        message: input.message ?? null,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[portal-enquiry] ingest failed", res.status, text);
    }
  } catch (error) {
    console.error("[portal-enquiry] ingest error", error);
  }
}
