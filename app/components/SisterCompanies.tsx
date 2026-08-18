import Image from "next/image";
import { sisterCompaniesFor, type SisterSite } from "../lib/sister-companies";

type SisterCompaniesProps = {
  site: SisterSite;
};

export default function SisterCompanies({ site }: SisterCompaniesProps) {
  const companies = sisterCompaniesFor(site);

  return (
    <div className="pt-8">
      <p className="text-white/70 text-sm mb-4 text-center md:text-left">
        Visit our sister companies
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto md:mx-0">
        {companies.map((company) => (
          <a
            key={company.href}
            href={company.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-md px-3 py-2.5 flex items-center justify-center h-[88px] min-w-0 overflow-hidden transition hover:shadow-md"
          >
            <Image
              src={company.src}
              alt={company.alt}
              width={360}
              height={121}
              className="h-[72px] w-auto max-w-full object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
