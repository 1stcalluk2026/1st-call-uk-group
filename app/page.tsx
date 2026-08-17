"use client";

import { useState } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import GroupHeader from "./components/GroupHeader";
import GroupFooter from "./components/GroupFooter";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-[#233a86] text-lg hover:text-[#1e2f6f] transition-colors"
      >
        <span>{question}</span>
        <span className="text-2xl ml-4 font-mono">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-700 leading-relaxed text-base transition-all duration-300 ease-in-out">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function GroupHome() {
  // Form States for the Centralized Inquiry System
  const [formData, setFormData] = useState({ name: "", email: "", service: "General", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Pull site key from env file or fallback directly to your verified key string
  const publicSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LdRaKEsAAAAAGvyAO9Z_0TA6apXxjg8S-v90OCt";

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setStatus("error");
      setErrorMessage("Please complete the reCAPTCHA checkbox verification step.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong during submission.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", service: "General", message: "" });
      setCaptchaToken(null);
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <>
      {/* INJECTING THE SLIDE-IN KEYFRAMES NATIVELY SO IT WORKS IMMEDIATELY */}
      <style jsx global>{`
        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 150ms; }
        .delay-2 { animation-delay: 300ms; }
        .delay-3 { animation-delay: 450ms; }
      `}</style>

      {/* HEADER */}
      <GroupHeader />
      
      {/* PAGE CONTENT */}
      <main className="bg-[#f5f7fb] overflow-hidden">
        
        {/* TRUST & ACCREDITATION COMPLIANCE RIBBON */}
        <div className="bg-white border-b border-gray-200 py-4 shadow-sm relative z-10 animate-slide-up">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 text-center">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#233a86]">
              <svg className="h-5 w-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Regulated UK Immigration Advisory</span>
            </div>
            <div className="hidden sm:block text-gray-300 font-light">|</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#233a86]">
              <svg className="h-5 w-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Chartered Financial & HMRC Compliance</span>
            </div>
            <div className="hidden sm:block text-gray-300 font-light">|</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#233a86]">
              <svg className="h-5 w-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Established Nottingham HQ</span>
            </div>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-6 md:px-10 py-14">
          
          {/* INTRO WITH CORRECT SINGLE H1 TAG FOR SEO SUPREMACY */}
          <div className="animate-slide-up opacity-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#233a86] mb-6">
              1st Call UK Group
            </h2>

            <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-16 leading-relaxed">
              A corporate group of premier professional services based in Nottingham, delivering trusted
              expertise in immigration, accounting, financial solutions, and future growth sectors. Each service within the 1st Call UK Group is delivered by a dedicated
              team of specialists focused on clarity, compliance, and results.
            </p>
          </div>

          {/* SERVICES SECTION */}
          <section id="services" aria-label="Our Core Services" className="scroll-mt-24">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {/* IMMIGRATION CARD */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col animate-slide-up opacity-0 delay-1 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48">
                  <Image
                    src="/immigration-card.jpg"
                    alt="UK Immigration advisory services in Nottingham"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#233a86] mb-3">
                    Immigration Services
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                    Regulated UK immigration advisers providing expert guidance on visas,
                    extensions, appeals, citizenship, sponsorship licences, and family
                    and work routes.
                  </p>

                  <a
                    href="https://www.1stcalluk.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#233a86] text-white font-semibold py-3 rounded-lg hover:bg-[#1e2f6f] transition-all duration-200"
                  >
                    Visit Immigration Services →
                  </a>
                </div>
              </div>

              {/* FINANCIAL CARD */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col animate-slide-up opacity-0 delay-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-48">
                  <Image
                    src="/financial-card.jpg"
                    alt="Accounting and financial advisory services Nottingham"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#233a86] mb-3">
                    Financial Services
                  </h3>

                  <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                    Chartered accountants and financial advisers offering tax returns,
                    bookkeeping, payroll, business accounts, and HMRC support for
                    individuals and companies.
                  </p>

                  <a
                    href="https://www.1stcalluk.financial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-[#233a86] text-white font-semibold py-3 rounded-lg hover:bg-[#1e2f6f] transition-all duration-200"
                  >
                    Visit Financial Services →
                  </a>
                </div>
              </div>

              {/* FUTURE SERVICES CARD */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden border border-dashed border-gray-300 flex flex-col animate-slide-up opacity-0 delay-3">
                <div className="relative h-48">
                  <Image
                    src="/coming-soon-card.jpg"
                    alt="Future web design and digital marketing services"
                    fill
                    className="object-cover grayscale"
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-500 mb-3">
                    Web & Digital Solutions
                  </h3>

                  <p className="text-gray-500 leading-relaxed flex-grow">
                    The 1st Call UK Group is expanding into technical engineering, high-performance web development, and digital marketing strategies to help businesses grow online.
                  </p>

                  <span className="mt-6 inline-flex items-center justify-center py-3 rounded-lg bg-gray-300 text-gray-500 font-semibold cursor-not-allowed">
                    Launching Soon
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section id="why-choose-us" className="mt-28 animate-slide-up opacity-0 delay-2 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#233a86] mb-6">
              Why Choose 1st Call UK Group
            </h2>

            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
              We bring together specialist professional services under one trusted group,
              offering clarity, accountability, and long-term support for individuals
              and businesses.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              
              {/* Expertise */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#233a86]/10">
                  <svg className="h-7 w-7 text-[#233a86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5c-2.28 0-4.39-.64-6.16-1.922L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#233a86] mb-3">
                  Specialist Expertise
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Each service is delivered by qualified professionals who focus solely
                  on their area of expertise — immigration, finance, and technical growth.
                </p>
              </div>

              {/* Client Focus */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#233a86]/10">
                  <svg className="h-7 w-7 text-[#233a86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 4a4 4 0 10-8 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#233a86] mb-3">
                  Client-Focused Approach
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We take time to understand your situation and provide clear,
                  practical advice tailored to your corporate needs.
                </p>
              </div>

              {/* Trust & Compliance */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#233a86]/10">
                  <svg className="h-7 w-7 text-[#233a86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657 1.343-3 3-3h1a3 3 0 110 6h-1c-1.657 0-3-1.343-3-3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 11a3 3 0 013-3h1a3 3 0 110 6H9a3 3 0 01-3-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#233a86] mb-3">
                  Trust & Compliance
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our service units operate within strict UK regulatory frameworks,
                  giving you full business confidence and peace of mind.
                </p>
              </div>

              {/* One Group */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-all duration-300">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#233a86]/10">
                  <svg className="h-7 w-7 text-[#233a86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#233a86] mb-3">
                  One Umbrella Group
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Access multiple professional enterprise services through one trusted corporate partner as your company scales.
                </p>
              </div>

            </div>
          </section>

          {/* GROUP MISSION & VALUES */}
          <section className="mt-28 animate-slide-up opacity-0 delay-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#233a86] mb-6">
              Our Mission & Values
            </h2>

            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-14 text-lg leading-relaxed">
              At 1st Call UK Group, our mission is to deliver trusted, ethical, and
              specialist professional services that genuinely support people and
              businesses at every stage of their journey.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {/* Integrity */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-[#233a86]/10 text-[#233a86]">
                  Our Principles
                </span>
                <h3 className="text-xl font-bold text-[#233a86] mb-3">
                  Integrity & Transparency
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We operate with honesty, clarity, and openness in everything we do —
                  providing straightforward advice with no hidden agendas.
                </p>
              </div>

              {/* Excellence */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-[#233a86]/10 text-[#233a86]">
                  Our Standards
                </span>
                <h3 className="text-xl font-bold text-[#233a86] mb-3">
                  Professional Excellence
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our teams maintain the highest professional standards through regulation,
                  continuous development, and industry best practices.
                </p>
              </div>

              {/* Client Commitment */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <span className="inline-block mb-4 px-4 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-[#233a86]/10 text-[#233a86]">
                  Our Promise
                </span>
                <h3 className="text-xl font-bold text-[#233a86] mb-3">
                  Commitment to Clients
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We put our clients first — taking time to understand their needs and
                  delivering practical, reliable solutions that create real business value.
                </p>
              </div>

            </div>
          </section>

          {/* ACCORDION FAQ SECTION */}
          <section id="faq" className="bg-white rounded-2xl shadow-sm mt-28 py-16 px-6 md:px-12 border border-gray-100 animate-slide-up opacity-0 delay-3 scroll-mt-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#233a86] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-center text-gray-600 max-w-xl mx-auto mb-10 text-base">
                Find clear answers regarding the operational structures and professional service pillars of the 1st Call UK Group.
              </p>
              
              <div className="space-y-2">
                <FAQItem 
                  question="What is the 1st Call UK Group?" 
                  answer="The 1st Call UK Group is a unified corporate umbrella network based in Nottingham. We deliver highly specialized, regulated professional business solutions across critical commercial sectors including UK immigration routing, financial accountancy, asset wealth management, and custom enterprise technical infrastructure." 
                />
                <FAQItem 
                  question="Are the services within the group legally regulated?" 
                  answer="Yes, absolute legal compliance is the core foundation of our network. Each operational branch functions within its respective legal and professional regulatory framework. Our immigration consultants are fully regulated corporate specialists, and our financial service sectors are managed by qualified chartered accountants." 
                />
                <FAQItem 
                  question="How can I access multiple corporate services?" 
                  answer="Our group architecture allows clients to cross-navigate ecosystem requirements seamlessly. You can engage with individual specialists directly through their dedicated brand service portals linked above, ensuring comprehensive corporate support tailored entirely to your personal or business journey." 
                />
              </div>
            </div>
          </section>

          {/* CENTRALIZED GROUP INQUIRY HUB FORM */}
          {/* Changed Group Inquiries title from h2 to h2 with matching standard text to avoid duplicate header hierarchy triggers */}
          <section id="contact" className="mt-28 bg-[#2d459c] rounded-3xl shadow-xl overflow-hidden text-white animate-slide-up opacity-0 delay-3 scroll-mt-24">
            <div className="grid lg:grid-cols-5">
              
              {/* LEFT BLUE BANNER - ADDED ENGAGING TRUST INFO TO FILL BLANK SPACE */}
              <div className="p-8 md:p-12 lg:col-span-2 bg-[#233a86] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight">Group Inquiries</h2>
                  <p className="mt-4 text-white/80 text-sm md:text-base leading-relaxed">
                    Need cross-sector assistance? Connect with our administration desk to coordinate unified immigration strategy blueprints and structural financial management setups.
                  </p>
                  
                  {/* Trust Pillars added to utilize the vertical space cleanly */}
                  <div className="mt-8 space-y-5 hidden sm:block">
                    <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-xl mt-0.5">⏱️</span>
                      <div>
                        <h4 className="font-semibold text-white text-sm">Response Timeframe</h4>
                        <p className="text-xs text-white/70 mt-0.5">All incoming group briefs are routed to sector handlers within 24 business hours.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="text-xl mt-0.5">🔒</span>
                      <div>
                        <h4 className="font-semibold text-white text-sm">Confidential Processing</h4>
                        <p className="text-xs text-white/70 mt-0.5">Your data parameters are protected using corporate-grade security channels.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact Coordinates Block */}
                <div className="mt-8 lg:mt-0 space-y-3 text-xs md:text-sm text-white/80 border-t border-white/10 pt-6">
                  <p className="flex items-center gap-3">
                    <span className="text-base">📍</span> Nottingham Head Office, UK
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="text-base">✉️</span> info@1stcalluk.com
                  </p>
                </div>
              </div>

              {/* RIGHT FORM FRAMEWORK */}
              <div className="p-8 md:p-12 lg:col-span-3 bg-white text-gray-800">
                {status === "success" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-3xl mb-4">✓</div>
                    <h3 className="text-2xl font-bold text-[#233a86]">Inquiry Transmitted</h3>
                    <p className="text-gray-600 mt-2 max-w-sm">Thank you. A specialized 1st Call UK corporate coordinator will review your request and route it to the appropriate account handlers shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-[#233a86] uppercase tracking-wider mb-2">Full Name</label>
                        <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d459c]" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#233a86] uppercase tracking-wider mb-2">Email Address</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d459c]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#233a86] uppercase tracking-wider mb-2">Required Core Sector</label>
                      <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d459c]">
                        <option value="General">General Group Multi-Service Inquiry</option>
                        <option value="Immigration">UK Immigration & Visa Routing</option>
                        <option value="Financial">Accounting & HMRC Financial Management</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#233a86] uppercase tracking-wider mb-2">Message Detail</label>
                      <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d459c]" placeholder="Provide a brief summary of your business requirements..." />
                    </div>

                    {/* CAPTCHA PLACEMENT BLOCK */}
                    <div className="flex justify-center py-2">
                      <ReCAPTCHA
                        sitekey={publicSiteKey}
                        onChange={onCaptchaChange}
                      />
                    </div>
                    
                    {status === "error" && (
                      <p className="text-sm font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-lg border border-rose-200 text-center">
                        ❌ {errorMessage}
                      </p>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === "sending" || !captchaToken} 
                      className="w-full bg-[#2d459c] text-white font-bold py-4 rounded-xl hover:bg-[#233a86] transition-all tracking-wide shadow-md disabled:bg-gray-200 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? "Processing Inquiry..." : "Submit Secure Group Inquiry →"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

        </section>
      </main>
      
      {/* FOOTER */}
      <GroupFooter />
    </>
  );
}