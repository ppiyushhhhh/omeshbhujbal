import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Business Intelligence & Analytics",
    skills: [
      { name: "Data Warehousing (Cognos)", level: 95 },
      { name: "Advanced Analytics & Big Data", level: 90 },
      { name: "Data Visualization (Tableau)", level: 88 },
    ],
  },
  {
    title: "AI / ML & Campaign Management",
    skills: [
      { name: "Machine Learning & AI", level: 85 },
      { name: "SAS Campaign Management", level: 90 },
      { name: "Customer Value Management", level: 92 },
    ],
  },
  {
    title: "Telecom OSS / BSS",
    skills: [
      { name: "BSS Transformation", level: 95 },
      { name: "Revenue Assurance & Fraud", level: 88 },
      { name: "VoLTE / IMS Delivery", level: 85 },
    ],
  },
  {
    title: "Digital & Enterprise IT",
    skills: [
      { name: "Digital Transformation Strategy", level: 95 },
      { name: "IT Operations & SLA Management", level: 90 },
      { name: "Cloud & Managed Services", level: 85 },
    ],
  },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="skill-bar mb-4 last:mb-0">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-foreground font-medium">{name}</span>
      <span className="text-xs text-primary font-medium">{level}%</span>
    </div>
    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
      <div
        className="skill-fill h-full rounded-full"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, hsl(217 91% 60%), hsl(192 95% 55%))",
        }}
        data-level={level}
      />
    </div>
  </div>
);

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".skill-category", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
      });
      const fills = sectionRef.current!.querySelectorAll(".skill-fill");
      fills.forEach((el) => {
        const level = (el as HTMLElement).dataset.level;
        gsap.to(el, {
          width: `${level}%`, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Expertise</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </div>
        <div className="skills-grid grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="skill-category glass-card-hover p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {cat.title}
              </h3>
              {cat.skills.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
