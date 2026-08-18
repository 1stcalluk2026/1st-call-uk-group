import type { Metadata } from "next";
import Link from "next/link";
import { parseDownloadSource, portalHref } from "../lib/app-download";

export const metadata: Metadata = {
  title: "Download our app",
  description:
    "Download the 1st Call UK client app, or continue in the web portal with the same login.",
};

export default async function DownloadPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const params = await searchParams;
  const source = parseDownloadSource(params.source);
  const portal = portalHref(source);

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-xl px-6 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#233a86]">
          1st Call UK Group
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Download our app
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Scan the header QR from your phone to open this page. The native apps are not
          on the public stores yet — use the client portal until then. Same login as the app.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href={portal}
            className="inline-flex items-center justify-center rounded-xl bg-[#233a86] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1e2f6f]"
          >
            Continue in the client portal
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to the website
          </Link>
        </div>
      </section>
    </div>
  );
}
