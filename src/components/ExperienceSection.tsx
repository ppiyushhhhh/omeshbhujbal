import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Chief Technology Officer",
    company: "Nexus Select Trust",
    period: "2023 – Present",
    description: "Leading enterprise-wide digital transformation, technology strategy, and innovation across India's largest retail REIT portfolio.",
  },
  {
    title: "VP – Technology & Digital",
    company: "Vodafone Idea",
    period: "2019 – 2023",
    description: "Spearheaded large-scale OSS/BSS transformation serving 400M+ subscribers. Led AI/ML adoption and cloud migration initiatives.",
  },
  {
    title: "Senior Director – IT",
    company: "Vodafone India",
    period: "2014 – 2019",
    description: "Managed enterprise IT infrastructure, BI analytics platform with 2000+ KPIs, and digital automation programs.",
  },
  {
    title: "Technology Leader",
    company: "GE Power",
    period: "2008 – 2014",
    description: "Drove technology solutions for power generation and grid infrastructure. Implemented enterprise analytics and monitoring systems.",
  },
  {
    title: "Senior Engineer",
    company: "Mahindra",
    period: "2001 – 2008",
    description: "Built foundational expertise in enterprise systems, ERP implementations, and technology operations management.",
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".exp-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.from(".timeline-item", {
        opacity: 0,
        x: -40,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
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
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px timeline-line" />

          {experiences.map((exp, i) => (
            <div key={i} className="timeline-item relative pl-12 md:pl-20 pb-12 last:pb-0 group">
              {/* Dot */}
              <div className="absolute left-2 md:left-6 top-1 timeline-dot group-hover:scale-125 transition-transform duration-300" />

              <div className="glass-card-hover p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                  <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <span className="text-xs text-primary font-medium tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-accent font-medium mb-3">{exp.company}</p>
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
