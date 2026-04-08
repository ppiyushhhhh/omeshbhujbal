import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: "M.S. – Information Management",
    school: "Syracuse University",
    period: "2000 – 2002",
  },
  {
    degree: "B.E. – Mechanical Engineering",
    school: "University of Pune",
    period: "1995 – 1999",
  },
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".edu-item", {
        opacity: 0, y: 20, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".edu-list", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 md:py-36 bg-card">
      <div className="section-container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="section-label">Background</p>
            <h2 className="section-title">Education</h2>
          </div>

          <div className="md:col-span-8 edu-list">
            {education.map((edu) => (
              <div key={edu.degree} className="edu-item py-6 border-b border-border last:border-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="font-serif text-lg text-foreground">{edu.degree}</h3>
                  <span className="text-xs text-muted-foreground tracking-wider">{edu.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
