export type AppDownloadSource = "immigration" | "financial" | "web" | "group";

export const DOWNLOAD_HOST: Record<AppDownloadSource, string> = {
  immigration: "1stcalluk.com",
  financial: "1stcalluk.financial",
  web: "1stcalluk.website",
  group: "1stcalluk.co.uk",
};

export const DOWNLOAD_QR_COLOR: Record<AppDownloadSource, string> = {
  immigration: "#233a86",
  financial: "#233a86",
  web: "#2d459c",
  group: "#233a86",
};

export const PORTAL_ORIGIN = "https://app.1stcalluk.co.uk";

const DEFAULT_SOURCE: AppDownloadSource = "group";

export function parseDownloadSource(value: string | null | undefined): AppDownloadSource {
  if (value === "immigration" || value === "financial" || value === "web" || value === "group") {
    return value;
  }
  return DEFAULT_SOURCE;
}

export function downloadPageHref(
  source: AppDownloadSource,
  medium: "website" | "qr" = "website",
): string {
  const params = new URLSearchParams({
    source,
    utm_source: DOWNLOAD_HOST[source],
    utm_medium: medium,
    utm_campaign: "app_download",
  });
  return `${PORTAL_ORIGIN}/download?${params.toString()}`;
}

export function qrImageSrc(source: AppDownloadSource): string {
  return `/api/download/qr?source=${source}`;
}

export function portalHref(source: AppDownloadSource): string {
  const path =
    source === "immigration"
      ? "/immigration"
      : source === "financial"
        ? "/financial"
        : source === "web"
          ? "/unlock?service=web"
          : "/sign-in";
  return `${PORTAL_ORIGIN}${path}`;
}
