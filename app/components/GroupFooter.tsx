import Image from "next/image";
import DownloadAppButton from "./DownloadAppButton";
import SisterCompanies from "./SisterCompanies";

export default function GroupFooter() {
  return (
    <footer className="bg-[#233a86] text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <div className="relative w-[220px] h-[90px] mb-4 bg-white rounded-lg overflow-hidden">
              <Image
                src="/1st-calluk-group-logo02.jpg"
                alt="1st Call UK Group"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-white/80 leading-relaxed text-sm">
              1st Call UK Group brings together specialist professional services
              under one trusted organisation, supporting individuals and businesses
              across the UK.
            </p>
             <p className="text-gray-400 text-xs mt-2">
            Website by –{" "}
            <a
              href="https://www.1stcalluk.website/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition"
            >
              1st Call UK Web &amp; Digital
            </a>
          </p>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li>
                <a
                  href="https://www.1stcalluk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Immigration Services
                </a>
              </li>
              <li>
                <a
                  href="https://www.1stcalluk.financial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Financial Services
                </a>
              </li>
              <li>
                <a
                  href="https://www.1stcalluk.website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Web & Digital Solutions
                </a>
              </li>
            </ul>
          </div>

         {/* GROUP FOCUS */}
<div>
  <h4 className="font-semibold text-lg mb-4">Our Focus</h4>

  <ul className="space-y-3 text-white/80 text-sm leading-relaxed">
    <li>
      Delivering trusted, regulated professional services through specialist
      teams in immigration, financial advisory, and web &amp; digital.
    </li>

    <li>
      Building long-term client relationships based on clarity, integrity,
      and measurable results.
    </li>

    <li>
      Expanding responsibly into new professional service areas to support
      individuals and businesses as they grow.
    </li>
  </ul>
</div>


          {/* CONTACT */}
<div>
  <h4 className="font-semibold text-lg mb-4">Contact</h4>

  <p className="text-white/80 text-sm leading-relaxed">
    📍 The Old Coach House, 25 Noel Street,<br />
    Forest Fields, Nottingham NG7 6AQ
  </p>

  <p className="mt-3 text-white/80 text-sm">
    Email:{" "}
    <a
      href="mailto:info@1stcalluk.com"
      className="hover:text-white transition"
    >
      info@1stcalluk.com
    </a>
  </p>
  <p className="mt-3">
    <a
      href={`${process.env.NEXT_PUBLIC_PORTAL_URL?.replace(/\/$/, "") || "https://1st-calluk-portal-1stcall-uk.vercel.app"}/sign-in`}
      className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/30 px-4 py-1.5 text-xs font-medium hover:bg-white/20 transition-all duration-200"
    >
      Client portal
    </a>
  </p>
  <div className="mt-4">
    <DownloadAppButton source="group" placement="footer" />
  </div>
</div>
                         

        </div>

        <SisterCompanies site="group" />
      </div>
    </footer>
  );
}
