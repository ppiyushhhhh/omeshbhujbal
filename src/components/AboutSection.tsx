import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 about-reveal">
            <p className="section-label">01 / About</p>
            <h2 className="section-title">22+ years of turning complex technology challenges into measurable business outcomes.</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 about-reveal">
            <div className="space-y-5 text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                Senior Technology Leader with over 22 years' experience across leading Indian & multi-national companies,
                including 16 years in telecom technology with Vodafone Idea Ltd., with additional experience in
                Manufacturing, Automotive & Management Consulting.
              </p>
              <p>
                Extensive experience across Business Intelligence, Analytics, Big Data, Digital Services,
                Campaign Management, Revenue Assurance, and Telecom OSS/BSS. Successfully led multiple high-budget,
                complex IT transformation initiatives in multi-stakeholder, multi-partner environments.
              </p>
              <p>
                Partnered with CXOs & business leaders to create technology roadmaps delivering innovative,
                cost-effective, highly scalable solutions with tangible business value.
              </p>
            </div>

            <div className="mt-12 grid sm:grid-cols-3 gap-8 border-t border-border pt-7">
              {[
                ["01", "Digital Transformation"],
                ["02", "AI & Analytics"],
                ["03", "Enterprise Technology"],
              ].map(([number, label]) => (
                <div key={number} className="about-reveal">
                  <p className="font-serif text-3xl text-primary">{number}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default AboutSection;
