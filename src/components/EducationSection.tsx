import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import syracuseLogo from "@/assets/logos/syracuse.jfif";
import puneLogo from "@/assets/logos/pune.jfif";

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: "M.S. – Information Management",
    school: "Syracuse University",
    period: "2000 – 2002",
    logo: syracuseLogo,
  },
  {
    degree: "B.E. – Mechanical Engineering",
    school: "University of Pune",
    period: "1995 – 1999",
    logo: puneLogo,
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
              <div
                key={edu.degree}
                className="edu-item group relative py-6 border-b border-border last:border-0 flex items-start gap-4 sm:gap-5 px-4 -mx-4 rounded-xl transition-all duration-300 ease-out hover:bg-background hover:shadow-lg hover:-translate-y-1 hover:border-transparent cursor-default"
              >
                <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-background border border-border flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:rotate-[-3deg]">
                  <img
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    className="w-full h-full object-contain p-1.5"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <h3 className="font-serif text-lg text-foreground transition-colors duration-300 group-hover:text-[hsl(0_85%_50%)]">{edu.degree}</h3>
                    <span className="text-xs text-muted-foreground tracking-wider">{edu.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
