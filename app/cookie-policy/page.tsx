import GroupHeader from "../components/GroupHeader";
import GroupFooter from "../components/GroupFooter";
import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | 1st Call UK Group",
  description: "How 1st Call UK Group uses cookies on 1stcalluk.co.uk.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <GroupHeader />
      <div className="mx-auto max-w-3xl px-6 py-16 text-slate-700">
        <h1 className="mb-4 text-4xl font-bold text-[#233a86]">Cookie Policy</h1>
        <p className="mb-8 text-sm text-slate-500">Last updated: 19 August 2026</p>
        <p className="mb-6 leading-relaxed">
          This Cookie Policy explains how 1st Call UK Group uses cookies and similar technologies
          on 1stcalluk.co.uk. Necessary cookies keep the site working. Analytics cookies only run
          if you choose to allow them.
        </p>
        <p className="mb-6 leading-relaxed">
          You can accept all cookies, refuse non-essential cookies, or customise your choices using
          the banner on this website. You can also control cookies in your browser settings.
        </p>
        <p className="leading-relaxed">
          Questions:{" "}
          <a href="mailto:info@1stcalluk.com" className="font-semibold text-[#233a86] underline">
            info@1stcalluk.com
          </a>
          . Return to the{" "}
          <Link href="/" className="font-semibold text-[#233a86] underline">
            homepage
          </Link>
          .
        </p>
      </div>
      <GroupFooter />
    </>
  );
}
