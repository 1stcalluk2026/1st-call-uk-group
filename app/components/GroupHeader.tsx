"use client";

import Link from "next/link";
import Image from "next/image";
import DownloadAppButton from "./DownloadAppButton";

export default function GroupHeader() {
  // Smooth scroll handler for standard internal anchor navigation
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* INJECTING DELIBERATE, SLOW AND GENTLE SLIDE-UP ANIMATIONS */}
      <style jsx global>{`
        @keyframes gentleSlowSlideUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-hero-slow-up {
          animation: gentleSlowSlideUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-text-slow-up {
          animation: gentleSlowSlideUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 250ms;
        }
      `}</style>

      <header className="sticky top-0 z-50 text-white shadow-lg">
        <div className="bg-[#1a2d6b] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-1.5 flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <DownloadAppButton source="group" />
            <a
              href={`${process.env.NEXT_PUBLIC_PORTAL_URL?.replace(/\/$/, "") || "https://1st-calluk-portal.vercel.app"}/sign-in`}
              className="inline-flex items-center rounded-full bg-white/10 text-white border border-white/30 px-4 py-1.5 text-xs font-medium hover:bg-white/20 transition-all duration-200"
            >
              Client portal
            </a>
          </div>
        </div>

        <div className="bg-[#233a86]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex justify-between items-center">
            <span className="text-xs text-white/80">1st Call UK Group</span>
            <div className="flex items-center gap-3 text-xs font-medium text-white/80 tracking-wide">
              <a href="#services" onClick={(e) => handleScroll(e, "services")} className="hover:text-white hover:underline transition-all">
                Our Services
              </a>
              <span className="text-white/30">•</span>
              <a href="#why-choose-us" onClick={(e) => handleScroll(e, "why-choose-us")} className="hover:text-white hover:underline transition-all">
                Why Choose Us
              </a>
              <span className="text-white/30">•</span>
              <a href="#faq" onClick={(e) => handleScroll(e, "faq")} className="hover:text-white hover:underline transition-all">
                FAQs
              </a>
            </div>
          </div>
        </div>

        {/* MAIN HEADER */}
        <div className="bg-[#2d459c]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center md:items-center gap-4">

            {/* LOGO - KEPT COMPLETELY STATIC WITH NO MOTION EFFECTS */}
            <Link href="/" className="block md:ml-6">
              <div className="w-[280px] h-[110px] relative bg-white rounded-xl shadow-md border border-white/40 overflow-hidden">
                <Image
                  src="/1st-calluk-group-logo02.jpg"
                  alt="1st Call UK Group Logo"
                  fill
                  priority
                  className="object-contain scale-[1.18]"
                />
              </div>
            </Link>

            {/* CENTERED GROUP STATEMENT */}
            <div className="md:ml-auto text-center md:text-right">
              <h1 className="text-white text-lg md:text-xl font-semibold tracking-wide">
                Professional Services Group
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Immigration • Financial • Advisory
              </p>
            </div>

          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative -mt-px h-[45vh] sm:h-[50vh] md:h-[55vh] overflow-hidden animate-hero-slow-up opacity-0">
        <Image
          src="/group-hero.jpg"
          alt="1st Call UK Group professional services"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-[#2d459c]/80 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10">
          <div className="animate-text-slow-up opacity-0">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              One Group. Trusted Expertise.
            </h2>

            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed">
              Professional services delivered through specialist teams in
              immigration, financial services, and web &amp; digital.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}