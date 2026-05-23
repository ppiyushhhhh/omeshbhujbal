import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import headshot from "@/assets/headshot.jpg";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "22+", label: "Years" },
  { value: "400M+", label: "Users Impacted" },
  { value: "Global", label: "Delivery" },
];

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
    <section id="about" ref={sectionRef} className="py-24 md:py-36">
      <div className="section-container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left column */}
          <div className="md:col-span-4 about-reveal">
            <div className="flex gap-10">

              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-2xl md:text-3xl text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-8 about-reveal">
            <p className="section-label">About</p>
            <h2 className="section-title mb-8">
              Driving digital transformation at enterprise scale
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
