"use client";

import { useEffect, useState } from "react";
import CookieBanner from "./components/CookieBanner";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down past 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll function to return to page top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* PAGE CONTENT */}
      <main className="flex-grow">
        {children}
      </main>

      <CookieBanner
        logoSrc="/1st-calluk-group-logo02.jpg"
        logoAlt="1st Call UK Group"
        policyHref="/cookie-policy"
      />

      {/* FLOATING SMOOTH SCROLL TO TOP ARROW BUTTON */}
      <button
        onClick={scrollToTop}
        type="button"
        aria-label="Scroll to top of page"
        className={`fixed bottom-24 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#233a86] text-white shadow-xl border border-white/20 transition-all duration-300 hover:bg-[#1e2f6f] hover:scale-110 active:scale-95 ${
          isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>
    </>
  );
}