import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { metric: "30%", title: "Cost Reduction", description: "Targeted through CVM transformation leveraging AI/ML for 400M customers." },
  { metric: "400M", title: "Customers", description: "Largest telco CVM implementation with omni-channel platform delivery." },
  { metric: "2,000+", title: "KPIs Unified", description: "'One MIS' transformation with unified DWH, Big Data, and performance dashboards." },
  { metric: "4×", title: "Recharge Growth", description: "Online transactions growth and 1M number portability requests via digital transformation." },
  { metric: "₹320M", title: "Revenue Uplift", description: "Annual VAS subscription revenue increase through Six Sigma CX improvements." },
  { metric: "15%", title: "Under Budget", description: "BSS transformation for VoLTE in 3 months with 4 partners — fastest in industry." },
];

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".ach-card", {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".ach-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="py-16 sm:py-20 md:py-28 lg:py-32 bg-card">
      <div className="section-container">
        <p className="section-label">Impact</p>
        <h2 className="section-title mb-14">Key achievements</h2>

        <div className="ach-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {achievements.map((a, i) => (
            <div key={i} className="ach-card bg-card p-8 md:p-10 group hover:bg-background transition-colors duration-300">
              <p className="font-serif text-4xl md:text-5xl text-foreground mb-3">{a.metric}</p>
              <p className="text-sm font-medium text-foreground mb-2 uppercase tracking-wider">{a.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
