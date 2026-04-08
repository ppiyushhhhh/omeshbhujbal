import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Chief Technology Officer",
    company: "Nexus Select Trust",
    period: "May 2023 – Mar 2026",
    location: "Mumbai, India",
    description: "Leading enterprise-wide digital transformation and technology strategy across India's largest retail REIT portfolio.",
  },
  {
    title: "Vice President – Information Technology",
    company: "Vodafone Idea Limited",
    period: "Jul 2021 – Apr 2022",
    location: "Mumbai, India",
    description: "Managed all national IT requirements for Customer Service, Marketing, Sales and Retail. Engaged with CXOs for strategic planning, budgeting, RFPs, and overseeing delivery and benefits realization.",
  },
  {
    title: "Integration Portfolio Lead – CVM & Analytics",
    company: "Vodafone Idea Limited",
    period: "Sep 2018 – Jul 2021",
    location: "Mumbai, India",
    description: "Drove integration strategy for the merged entity. Consolidated DWH, Data Lake, and reporting with 250+ KPI harmonization. Led CVM transformation for 400M customers leveraging AI/ML, targeting 30% cost reduction.",
  },
  {
    title: "Lead – Business Intelligence & Analytics",
    company: "Vodafone Idea (Idea Cellular)",
    period: "Apr 2017 – Sep 2018",
    location: "Mumbai, India",
    description: "Led BI, Data Warehousing, Advanced Analytics, and Big Data. Crafted Enterprise Analytics transformation roadmap covering Cognos, ML, Big Data, SAS Campaign Management, and Tableau. Managed 120+ IBM resources.",
  },
  {
    title: "Portfolio Head – Digital & Services Platforms IT Ops",
    company: "Idea Cellular",
    period: "Jun 2014 – Mar 2017",
    location: "Mumbai, India",
    description: "Managed IT operations for digital services (₹3B revenue), VAS (₹2.5B revenue), WiFi, IVR, and data platforms (30M subs). Led 150+ partner resources across India, Israel, and Poland.",
  },
  {
    title: "Program Manager",
    company: "Idea Cellular",
    period: "Jul 2006 – May 2014",
    location: "Mumbai, India",
    description: "Led Digital Marketing, Collections, Revenue Assurance, Fraud Management, and Content Settlement. Achieved 1M number portability requests, 4x growth in online recharges, and 12% revenue increase.",
  },
  {
    title: "Senior Consultant",
    company: "Mahajan & Aibara",
    period: "Aug 2004 – Jun 2006",
    location: "Mumbai, India",
    description: "Management consulting across India, Singapore, and Malaysia. Specialized in BPR (Pfizer, Tata Teleservices), Performance Improvement (Raymond), and Management Assurance (BASF SE Asia).",
  },
  {
    title: "Analyst – E-Business",
    company: "GE Power",
    period: "Sep 2001 – Jul 2003",
    location: "Schenectady, NY, USA",
    description: "Assisted E-Business leader in digitization strategy and governance across USA, Asia, and Europe. Received 'Outstanding Project Management' Award.",
  },
  {
    title: "Strategic Sourcing Analyst",
    company: "Mahindra Automotive & Farm Equipment",
    period: "Jun 1999 – May 2000",
    location: "Mumbai, India",
    description: "Managed development cycle of Tier 1 metal forging suppliers for gearbox components. Evaluated vendor capabilities and ensured delivery targets.",
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".exp-heading", {
        opacity: 0, y: 30, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".timeline-item", {
        opacity: 0, x: -40, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".timeline-container", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container">
        <div className="exp-heading text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Career</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Professional <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="timeline-container relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px timeline-line" />

          {experiences.map((exp, i) => (
            <div key={i} className="timeline-item relative pl-12 md:pl-20 pb-10 last:pb-0 group">
              <div className="absolute left-2 md:left-6 top-1 timeline-dot group-hover:scale-125 transition-transform duration-300" />
              <div className="glass-card-hover p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                  <h3 className="font-display text-base md:text-lg font-semibold text-foreground">{exp.title}</h3>
                  <span className="text-xs text-primary font-medium tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full w-fit whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-accent font-medium mb-1">{exp.company}</p>
                <p className="text-xs text-muted-foreground/60 mb-3">{exp.location}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
