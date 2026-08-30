import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import leelaLogo from "@/assets/logos/the-leela.jfif";
import nexusLogo from "@/assets/logos/nexus.jfif";
import viLogo from "@/assets/logos/vi.jfif";
import geLogo from "@/assets/logos/ge.jfif";
import mahindraLogo from "@/assets/logos/mahindra.jfif";
import mahajanLogo from "@/assets/logos/mahajan.jfif";

gsap.registerPlugin(ScrollTrigger);

type Role = {
  title: string;
  period: string;
  subCompany?: string;
  description: string;
};

type Company = {
  company: string;
  period: string;
  badge?: string;
  summary?: string;
  logo: string | null;
  roles: Role[];
};

const companies: Company[] = [
  {
    company: "The Leela Palaces, Hotels and Resorts",
    period: "Mar 2026 – Present",
    logo: leelaLogo,
    roles: [
      {
        title: "Vice President – Digital & Information Technology",
        period: "Mar 2026 – Present · Mumbai, Maharashtra, India · On-site",
        description:
          "Driving Digital Strategy and Artificial Intelligence (AI) initiatives across luxury hospitality operations.",
      },
    ],
  },
  {
    company: "Nexus Select Trust",
    period: "2023 – 2026",
    logo: nexusLogo,
    summary:
      "Leading enterprise-wide digital transformation and technology strategy across India's largest retail REIT portfolio.",
    roles: [
      {
        title: "Chief Technology Officer",
        period: "2023 – 2026",
        description:
          "Leading enterprise-wide digital transformation and technology strategy across India's largest retail REIT portfolio.",
      },
    ],
  },
  {
    company: "Vodafone Idea Limited / Idea Cellular",
    period: "2006 – 2022",
    badge: "16+ Years",
    logo: viLogo,
    summary:
      "Sixteen years of progressive leadership across IT operations, digital transformation, analytics, and large-scale program management — driving enterprise-wide initiatives for one of India's largest telecom operators.",
    roles: [
      {
        title: "Vice President – Information Technology",
        period: "2021 – 2022",
        subCompany: "Vodafone Idea Limited",
        description:
          "Managed national IT operations for Customer Service, Marketing, Sales, and Retail functions. Led strategic planning, budgeting, enterprise transformation initiatives, and CXO-level technology governance.",
      },
      {
        title: "Integration Portfolio Lead – CVM & Analytics",
        period: "2018 – 2021",
        subCompany: "Vodafone Idea Limited",
        description:
          "Directed integration strategy for the merged telecom entity. Consolidated Data Warehouse and Data Lake platforms with 250+ KPI harmonization initiatives. Led AI/ML-driven CVM transformation programs supporting 400M+ customers.",
      },
      {
        title: "Lead – Business Intelligence & Analytics",
        period: "2017 – 2018",
        subCompany: "Idea Cellular",
        description:
          "Led enterprise analytics modernization initiatives involving Cognos, Machine Learning, Big Data, SAS Campaign Management, and Tableau ecosystems. Managed 8 Project Managers and 120+ IBM resources.",
      },
      {
        title: "Portfolio Head – Digital & IT Operations",
        period: "2014 – 2017",
        subCompany: "Idea Cellular",
        description:
          "Oversaw IT operations for digital services, VAS, WiFi, and IVR platforms supporting multi-billion revenue portfolios. Managed 150+ partner resources across India, Israel, and Poland.",
      },
      {
        title: "Program Manager",
        period: "2006 – 2014",
        subCompany: "Idea Cellular",
        description:
          "Handled Digital Marketing, Collections, Revenue Assurance, and Fraud Management initiatives. Achieved 4× online recharge growth, managed 1M portability requests, and contributed to 12% revenue growth.",
      },
    ],
  },
  {
    company: "Mahajan & Aibara",
    period: "2004 – 2006",
    logo: mahajanLogo,
    roles: [
      {
        title: "Senior Consultant",
        period: "2004 – 2006",
        description:
          "Management consulting across India, Singapore, and Malaysia. Delivered Business Process Reengineering for Pfizer and Tata Teleservices, and Performance Improvement engagements for Raymond.",
      },
    ],
  },
  {
    company: "GE Power",
    period: "2001 – 2003",
    logo: geLogo,
    roles: [
      {
        title: "Analyst – E-Business",
        period: "2001 – 2003",
        description:
          "Digitization strategy across USA, Asia, and Europe. Recipient of the 'Outstanding Project Management' Award.",
      },
    ],
  },
  {
    company: "Mahindra Automotive",
    period: "1999 – 2000",
    logo: mahindraLogo,
    roles: [
      {
        title: "Strategic Sourcing Analyst",
        period: "1999 – 2000",
        description:
          "Tier-1 supplier development for gearbox components. Vendor evaluation, qualification, and delivery management.",
      },
    ],
  },
];

const CompanyCard = ({ company }: { company: Company }) => {
  const isMulti = company.roles.length > 1;

  return (
    <article className="exp-card border-b border-border py-8 md:py-11">
      <div className="grid gap-5 md:grid-cols-[5rem_1fr] md:gap-8">
        <div>
          {company.logo && (
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden border border-border bg-background p-1.5">
              <img
                src={company.logo}
                alt={`${company.company} logo`}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
                {company.company}
                </h3>
                {company.badge && <span className="border border-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">{company.badge}</span>}
              </div>
              <p className="mt-2 text-sm font-medium text-foreground/80">{company.roles[0].title}</p>
            </div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:text-right">{company.period}</p>
          </div>
          {company.summary && isMulti && <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{company.summary}</p>}

          <details className="group/details mt-5">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span>{isMulti ? `Explore ${company.roles.length} roles` : "View role details"}</span>
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-open/details:rotate-180" aria-hidden="true" />
            </summary>
            <div className="relative mt-7 pl-6">
              <div className="absolute bottom-2 left-[5px] top-2 w-px bg-border" aria-hidden="true" />
              <ol className="space-y-7">
                {company.roles.map((role) => (
                  <li key={`${role.title}-${role.period}`} className="relative">
                    <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" aria-hidden="true" />
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h4 className="font-serif text-lg text-foreground md:text-xl">{role.title}</h4>
                      <span className="shrink-0 text-[11px] tracking-[0.08em] text-muted-foreground">{role.period}</span>
                    </div>
                    {role.subCompany && <p className="mt-1 text-xs font-medium text-foreground/70">{role.subCompany}</p>}
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{role.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </details>
        </div>
      </div>
    </article>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".exp-card", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".exp-list", start: "top 82%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-4">
            <p className="section-label">02 / Career</p>
            <h2 className="section-title">Experience</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">A career progressing from operational rigor to enterprise technology leadership across global organizations.</p>
          </header>

          <div className="exp-list border-t border-border lg:col-span-8">
            {companies.map((company) => (
              <CompanyCard key={company.company} company={company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
