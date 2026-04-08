import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: "MBA – Systems & Operations",
    school: "Symbiosis International University",
    year: "2006",
  },
  {
    degree: "B.E. – Electronics & Telecommunication",
    school: "University of Pune",
    year: "2001",
  },
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".edu-card", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".edu-grid", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Background</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className="edu-grid grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {education.map((edu) => (
            <div key={edu.degree} className="edu-card glass-card-hover p-8 text-center">
              <span className="text-xs text-primary font-medium tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-full">
                {edu.year}
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground mt-4 mb-2">
                {edu.degree}
              </h3>
              <p className="text-sm text-muted-foreground">{edu.school}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
