export type SisterSite = "web" | "immigration" | "financial" | "group";

export type SisterCompany = {
  href: string;
  src: string;
  alt: string;
};

/** Canonical footer logos — identical filenames on every 1st Call UK site. */
export const sisterCompanyLogos: Record<SisterSite, SisterCompany> = {
  immigration: {
    href: "https://www.1stcalluk.com/",
    src: "/1stCallUK_immigration-services-footer.jpg",
    alt: "1st Call UK Immigration Services",
  },
  financial: {
    href: "https://www.1stcalluk.financial",
    src: "/1stCallUK_financial-services-footer.jpg",
    alt: "1st Call UK Financial Services",
  },
  group: {
    href: "https://www.1stcalluk.co.uk/",
    src: "/1stCallUK_group_logo02.jpg",
    alt: "1st Call UK Group",
  },
  web: {
    href: "https://www.1stcalluk.website/",
    src: "/1stCallUK_web-design-services-footer.jpg",
    alt: "1st Call UK Web & Digital",
  },
};

export function sisterCompaniesFor(site: SisterSite): SisterCompany[] {
  return (Object.keys(sisterCompanyLogos) as SisterSite[])
    .filter((key) => key !== site)
    .map((key) => sisterCompanyLogos[key]);
}
