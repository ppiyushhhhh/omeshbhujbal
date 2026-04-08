import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "22+", label: "Years of Experience", icon: "⚡" },
  { value: "400M+", label: "Customers Impacted", icon: "🌍" },
  { value: "Global", label: "Multi-country Delivery", icon: "🏢" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-text", {
        opacity: 0, x: -60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".stat-card", {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="about-text">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">About</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Driving Digital
              <span className="gradient-text"> Transformation</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Senior Technology Leader with over 22 years' experience across leading Indian & multi-national companies,
              including 16 years in telecom technology with Vodafone Idea Ltd., with additional experience in
              Manufacturing, Automotive & Management Consulting.
            </p>
            <p className="text-muted-foreground/70 leading-relaxed mb-4">
              Extensive experience across Business Intelligence, Analytics, Big Data, Digital Services,
              Campaign Management, Revenue Assurance, and Telecom OSS/BSS. Successfully led multiple high-budget,
              complex IT transformation initiatives in multi-stakeholder, multi-partner environments (IBM, TCS, Wipro, Accenture).
            </p>
            <p className="text-muted-foreground/70 leading-relaxed">
              Partnered with CXOs & business leaders to create technology roadmaps delivering innovative,
              cost-effective, highly scalable solutions with tangible business value.
            </p>
          </div>

          <div ref={cardsRef} className="grid gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card glass-card-hover p-6 flex items-center gap-6">
                <div className="text-3xl w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10">
                  {stat.icon}
                </div>
                <div>
                  <p className="font-display text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
