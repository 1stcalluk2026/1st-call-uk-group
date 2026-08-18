import { NextResponse } from "next/server";
import {
  DOWNLOAD_QR_COLOR,
  downloadPageHref,
  parseDownloadSource,
} from "../../../lib/app-download";
import { qrSvg } from "../../../lib/qr-svg";

const SITE_URL = "https://www.1stcalluk.co.uk";

export async function GET(request: Request) {
  const source = parseDownloadSource(new URL(request.url).searchParams.get("source"));
  const target = new URL(downloadPageHref(source, "qr"), SITE_URL).toString();
  const svg = await qrSvg(target, DOWNLOAD_QR_COLOR[source]);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
