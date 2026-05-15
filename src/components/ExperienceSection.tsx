import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import nexusLogo from "@/assets/logos/nexus.jfif";
import viLogo from "@/assets/logos/vi.jfif";
import geLogo from "@/assets/logos/ge.jfif";
import mahindraLogo from "@/assets/logos/mahindra.jfif";
import mahajanLogo from "@/assets/logos/mahajan.jfif";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Chief Technology Officer",
    company: "Nexus Select Trust",
    period: "2023 – 2026",
    description: "Leading enterprise-wide digital transformation and technology strategy across India's largest retail REIT portfolio.",
    logo: nexusLogo,
  },
  {
    title: "Vice President – Information Technology",
    company: "Vodafone Idea Limited",
    period: "2021 – 2022",
    description: "Managed national IT for Customer Service, Marketing, Sales and Retail. Strategic planning, budgeting, and benefits realization with CXOs.",
    logo: viLogo,
  },
  {
    title: "Integration Portfolio Lead – CVM & Analytics",
    company: "Vodafone Idea Limited",
    period: "2018 – 2021",
    description: "Drove integration strategy for the merged entity. Consolidated DWH and Data Lake with 250+ KPI harmonization. Led CVM transformation for 400M customers leveraging AI/ML.",
    logo: viLogo,
  },
  {
    title: "Lead – Business Intelligence & Analytics",
    company: "Idea Cellular",
    period: "2017 – 2018",
    description: "Enterprise Analytics transformation — Cognos, ML, Big Data, SAS Campaign Management, and Tableau. Managed 8 PMs and 120+ IBM resources.",
    logo: null,
  },
  {
    title: "Portfolio Head – Digital & IT Operations",
    company: "Idea Cellular",
    period: "2014 – 2017",
    description: "IT operations for digital services (₹3B revenue), VAS (₹2.5B), WiFi, IVR. Led 150+ partner resources across India, Israel, and Poland.",
    logo: null,
  },
  {
    title: "Program Manager",
    company: "Idea Cellular",
    period: "2006 – 2014",
    description: "Digital Marketing, Collections, Revenue Assurance, Fraud Management. 4x online recharge growth, 1M portability requests, 12% revenue increase.",
    logo: null,
  },
  {
    title: "Senior Consultant",
    company: "Mahajan & Aibara",
    period: "2004 – 2006",
    description: "Management consulting across India, Singapore, Malaysia. BPR for Pfizer and Tata Teleservices, Performance Improvement for Raymond.",
    logo: mahajanLogo,
  },
  {
    title: "Analyst – E-Business",
    company: "GE Power",
    period: "2001 – 2003",
    description: "Digitization strategy across USA, Asia, and Europe. Received 'Outstanding Project Management' Award.",
    logo: geLogo,
  },
  {
    title: "Strategic Sourcing Analyst",
    company: "Mahindra Automotive",
    period: "1999 – 2000",
    description: "Tier 1 supplier development for gearbox components. Vendor evaluation and delivery management.",
    logo: mahindraLogo,
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

type Experience = (typeof experiences)[number];

const ExperienceRow = ({ exp, isLast }: { exp: Experience; isLast: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0.5);
  const mvY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mvY, [0, 1], [2.5, -2.5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mvX, [0, 1], [-2.5, 2.5]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mvX, (v) => `${v * 100}%`);
  const glowY = useTransform(mvY, (v) => `${v * 100}%`);

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={`exp-item group relative py-6 flex gap-4 sm:gap-5 ${
        !isLast ? "border-b border-border" : ""
      } -mx-4 sm:-mx-5 px-4 sm:px-5 rounded-xl will-change-transform`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY] as any,
            ([x, y]: any) =>
              `radial-gradient(380px circle at ${x} ${y}, hsl(var(--foreground) / 0.07), transparent 60%)`
          ),
        }}
      />

      {exp.logo && (
        <div
          className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-background border border-border flex items-center justify-center relative z-10 transition-shadow duration-300 group-hover:shadow-md"
          style={{ transform: "translateZ(20px)" }}
        >
          <img
            src={exp.logo}
            alt={`${exp.company} logo`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex-1 min-w-0 relative z-10" style={{ transform: "translateZ(10px)" }}>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
          <h3 className="font-serif text-lg md:text-xl text-foreground transition-colors duration-300">
            {exp.title}
          </h3>
          <span className="text-xs text-muted-foreground font-sans tracking-wider shrink-0">
            {exp.period}
          </span>
        </div>
        <p className="text-sm font-medium text-foreground/60 mb-2">{exp.company}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".exp-item", {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".exp-list", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 md:py-36">
      <div className="section-container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="section-label">Career</p>
            <h2 className="section-title">Experience</h2>
          </div>

          <div className="md:col-span-8 exp-list">
            <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm px-6 sm:px-8 shadow-sm">
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="exp-item group py-6 border-b border-border last:border-0 flex gap-4 sm:gap-5"
                >
                  {exp.logo && (
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-background border border-border flex items-center justify-center">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                      <h3 className="font-serif text-lg md:text-xl text-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <span className="text-xs text-muted-foreground font-sans tracking-wider shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground/60 mb-2">{exp.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
