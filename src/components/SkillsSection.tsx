import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const domains = [
  {
    number: "01",
    title: "Digital & Enterprise Transformation",
    summary: "Shaping technology roadmaps that connect operating-model change with measurable business value.",
    capabilities: "Digital strategy · Enterprise IT · Cloud & managed services · Mobile payments",
  },
  {
    number: "02",
    title: "Data, AI & Customer Intelligence",
    summary: "Turning enterprise data into decision systems, customer relevance, and scalable growth.",
    capabilities: "Data warehousing · Big Data · Machine learning · Predictive analytics · CVM",
  },
  {
    number: "03",
    title: "Technology Operations & Platforms",
    summary: "Modernizing complex, always-on technology estates while protecting continuity and performance.",
    capabilities: "IT operations · BSS transformation · VoLTE / IMS · SLA management · Automation",
  },
  {
    number: "04",
    title: "Risk, Revenue & Performance",
    summary: "Applying governance and insight to strengthen controls, commercial outcomes, and executive visibility.",
    capabilities: "Revenue assurance · Fraud management · Advanced analytics · Tableau · Cognos",
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".domain-row", { opacity: 0, y: 22 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".domains-list", start: "top 82%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="bg-card py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-4">
            <p className="section-label">05 / Expertise</p>
            <h2 className="section-title">Leadership domains</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">A strategic practice built across technology, transformation, data, and operational leadership.</p>
          </header>

          <div className="domains-list border-t border-border lg:col-span-8">
            {domains.map((domain) => (
              <article key={domain.number} className="domain-row grid gap-4 border-b border-border py-8 sm:grid-cols-[4rem_1fr] md:py-10">
                <p className="font-serif text-2xl text-primary">{domain.number}</p>
                <div className="grid gap-4 md:grid-cols-2 md:gap-10">
                  <div>
                    <h3 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">{domain.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{domain.summary}</p>
                  </div>
                  <p className="text-xs leading-6 uppercase tracking-[0.12em] text-muted-foreground md:pt-1">{domain.capabilities}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;