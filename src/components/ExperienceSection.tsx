import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  accent?: string; // tailwind color class for accent line
  roles: Role[];
};

const companies: Company[] = [
  {
    company: "The Leela Palaces, Hotels and Resorts",
    period: "Mar 2026 – Present",
    logo: leelaLogo,
    accent: "bg-foreground",
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
    accent: "bg-foreground",
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
    accent: "bg-[hsl(0_85%_50%)]",
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
    accent: "bg-foreground",
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
    accent: "bg-foreground",
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
    accent: "bg-foreground",
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
  const ref = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mvY, [0, 1], [1.5, -1.5]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mvX, [0, 1], [-1.5, 1.5]), { stiffness: 200, damping: 22 });
  const glowX = useTransform(mvX, (v) => `${v * 100}%`);
  const glowY = useTransform(mvY, (v) => `${v * 100}%`);
  const glowBg = useTransform(
    [glowX, glowY] as any,
    ([x, y]: any) =>
      `radial-gradient(500px circle at ${x} ${y}, hsl(var(--foreground) / 0.05), transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mvX.set((e.clientX - rect.left) / rect.width);
    mvY.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    mvX.set(0.5);
    mvY.set(0.5);
  };

  const isMulti = company.roles.length > 1;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="exp-card group relative rounded-2xl border border-border bg-card/70 backdrop-blur-sm shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden"
    >
      <motion.div
        aria-hidden
        style={{ background: glowBg }}
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Accent stripe */}
      <div className={`absolute left-0 top-0 h-full w-1 ${company.accent ?? "bg-foreground"}`} />

      <div className="relative p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 sm:gap-5">
          {company.logo && (
            <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-background border border-border flex items-center justify-center shadow-sm">
              <img
                src={company.logo}
                alt={`${company.company} logo`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="font-serif text-xl md:text-2xl text-foreground leading-tight">
                {company.company}
              </h3>
              {company.badge && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-[hsl(0_85%_50%)]/10 text-[hsl(0_70%_42%)] border border-[hsl(0_85%_50%)]/20">
                  {company.badge}
                </span>
              )}
            </div>
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-foreground">
              {company.period}
            </p>
            {company.summary && isMulti && (
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {company.summary}
              </p>
            )}
          </div>
        </div>

        {/* Roles */}
        {isMulti ? (
          <div className="mt-7 relative pl-6 sm:pl-7">
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-border" />
            <ul className="space-y-6">
              {company.roles.map((role, i) => (
                <li key={i} className="relative">
                  {/* Dot */}
                  <span className="absolute -left-6 sm:-left-7 top-1.5 flex items-center justify-center">
                    <span className="block w-3 h-3 rounded-full bg-background border-2 border-[hsl(0_85%_50%)] shadow-[0_0_0_3px_hsl(var(--background))] transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h4 className="font-serif text-base md:text-lg text-foreground">
                      {role.title}
                    </h4>
                    <span className="text-[11px] font-sans tracking-wider text-muted-foreground shrink-0">
                      {role.period}
                    </span>
                  </div>
                  {role.subCompany && (
                    <p className="text-xs font-medium text-foreground/60 mt-0.5">
                      {role.subCompany}
                    </p>
                  )}
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-5">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h4 className="font-serif text-base md:text-lg text-foreground">
                {company.roles[0].title}
              </h4>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              {company.roles[0].description}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".exp-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-list", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="section-label">Career</p>
            <h2 className="section-title">Experience</h2>
          </div>

          <div className="md:col-span-8 exp-list space-y-6">
            {companies.map((c, i) => (
              <CompanyCard key={i} company={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
