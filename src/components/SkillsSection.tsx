import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: "Business Intelligence & Analytics",
    items: ["Data Warehousing", "Cognos", "Big Data", "Tableau", "Advanced Analytics"],
  },
  {
    title: "AI / ML & Automation",
    items: ["Machine Learning", "SAS Campaign Management", "Customer Value Management", "Predictive Analytics"],
  },
  {
    title: "Telecom OSS / BSS",
    items: ["BSS Transformation", "Revenue Assurance", "Fraud Management", "VoLTE / IMS", "Number Portability"],
  },
  {
    title: "Digital & Enterprise IT",
    items: ["Digital Strategy", "Cloud & Managed Services", "IT Operations", "SLA Management", "Mobile Payments"],
  },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".skill-group", {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".skills-wrap", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="section-label">Expertise</p>
            <h2 className="section-title">Skills</h2>
          </div>

          <div className="md:col-span-8 skills-wrap grid sm:grid-cols-2 gap-10">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-group">
                <h3 className="font-serif text-lg text-foreground mb-4">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
