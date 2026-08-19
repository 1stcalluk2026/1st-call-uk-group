"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const STORAGE_KEY = "1stcalluk-cookie-consent";

type Consent = "all" | "necessary";

type CookieBannerProps = {
  logoSrc: string;
  logoAlt: string;
  policyHref: string;
};

export default function CookieBanner({ logoSrc, logoAlt, policyHref }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);
  const [customise, setCustomise] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== "all" && saved !== "necessary") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore quota / private mode */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-gray-200 bg-white shadow-[0_-4px_24px_rgba(15,23,42,0.08)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3 pr-20 md:flex-row md:items-center md:gap-6 md:px-6 md:pr-24">
        <div className="relative hidden h-10 w-28 shrink-0 sm:block">
          <Image src={logoSrc} alt={logoAlt} fill className="object-contain object-left" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-800">This website uses cookies</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 md:text-sm">
            We use cookies to keep the site working, understand traffic, and improve our services.
            You can accept all, refuse non-essential cookies, or customise your choices.{" "}
            <Link href={policyHref} className="font-semibold text-[#2d459c] underline underline-offset-2">
              Cookie Policy
            </Link>
          </p>

          {customise ? (
            <label className="mt-3 flex items-center gap-2 text-xs text-slate-700 md:text-sm">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 accent-[#2d459c]"
              />
              Analytics cookies (optional)
            </label>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => save("necessary")}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Deny
          </button>
          <button
            type="button"
            onClick={() => {
              if (customise) {
                save(analytics ? "all" : "necessary");
                return;
              }
              setCustomise(true);
            }}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {customise ? "Save choices" : "Customise"}
          </button>
          <button
            type="button"
            onClick={() => save("all")}
            className="rounded-md bg-[#1e2e68] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d459c]"
          >
            Allow all
          </button>
        </div>
      </div>
    </div>
  );
}
