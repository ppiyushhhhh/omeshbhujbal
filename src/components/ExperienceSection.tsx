import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Chief Technology Officer",
    company: "Nexus Select Trust",
    period: "2023 – 2026",
    description: "Leading enterprise-wide digital transformation and technology strategy across India's largest retail REIT portfolio.",
  },
  {
    title: "Vice President – Information Technology",
    company: "Vodafone Idea Limited",
    period: "2021 – 2022",
    description: "Managed national IT for Customer Service, Marketing, Sales and Retail. Strategic planning, budgeting, and benefits realization with CXOs.",
  },
  {
    title: "Integration Portfolio Lead – CVM & Analytics",
    company: "Vodafone Idea Limited",
    period: "2018 – 2021",
    description: "Drove integration strategy for the merged entity. Consolidated DWH and Data Lake with 250+ KPI harmonization. Led CVM transformation for 400M customers leveraging AI/ML.",
  },
  {
    title: "Lead – Business Intelligence & Analytics",
    company: "Idea Cellular",
    period: "2017 – 2018",
    description: "Enterprise Analytics transformation — Cognos, ML, Big Data, SAS Campaign Management, and Tableau. Managed 8 PMs and 120+ IBM resources.",
  },
  {
    title: "Portfolio Head – Digital & IT Operations",
    company: "Idea Cellular",
    period: "2014 – 2017",
    description: "IT operations for digital services (₹3B revenue), VAS (₹2.5B), WiFi, IVR. Led 150+ partner resources across India, Israel, and Poland.",
  },
  {
    title: "Program Manager",
    company: "Idea Cellular",
    period: "2006 – 2014",
    description: "Digital Marketing, Collections, Revenue Assurance, Fraud Management. 4x online recharge growth, 1M portability requests, 12% revenue increase.",
  },
  {
    title: "Senior Consultant",
    company: "Mahajan & Aibara",
    period: "2004 – 2006",
    description: "Management consulting across India, Singapore, Malaysia. BPR for Pfizer and Tata Teleservices, Performance Improvement for Raymond.",
  },
  {
    title: "Analyst – E-Business",
    company: "GE Power",
    period: "2001 – 2003",
    description: "Digitization strategy across USA, Asia, and Europe. Received 'Outstanding Project Management' Award.",
  },
  {
    title: "Strategic Sourcing Analyst",
    company: "Mahindra Automotive",
    period: "1999 – 2000",
    description: "Tier 1 supplier development for gearbox components. Vendor evaluation and delivery management.",
  },
];

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
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="exp-item group py-6 border-b border-border last:border-0"
              >
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
