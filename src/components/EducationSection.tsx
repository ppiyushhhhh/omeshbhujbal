import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";
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
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".edu-list", start: "top 90%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="education" ref={sectionRef} className="bg-card py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-4">
            <p className="section-label">06 / Background</p>
            <h2 className="section-title">Education</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">Formal foundations in information management and engineering that continue to shape a systems-led leadership practice.</p>
          </header>

          <div className="edu-list border-t border-border lg:col-span-8">
            {education.map((edu) => (
              <article
                key={edu.degree}
                className="edu-item grid gap-5 border-b border-border py-8 sm:grid-cols-[5rem_1fr] sm:gap-8 md:py-10"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-border bg-background p-1.5">
                  <img
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">{edu.degree}</h3>
                    <span className="shrink-0 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{edu.school}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
