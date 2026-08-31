import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { metric: "30%", title: "Cost reduction", context: "AI-led customer value management", description: "Targeted through a CVM transformation designed around machine learning and decisioning for 400 million customers." },
  { metric: "400M", title: "Customers", context: "Enterprise-scale customer platforms", description: "Delivered one of the largest telecom CVM implementations through an integrated omni-channel platform." },
  { metric: "2,000+", title: "KPIs unified", context: "A single source of enterprise truth", description: "Created the ‘One MIS’ transformation by aligning data warehousing, Big Data, and performance dashboards." },
  { metric: "4×", title: "Recharge growth", context: "Digital commerce transformation", description: "Scaled online transactions while supporting one million mobile number portability requests." },
  { metric: "₹320M", title: "Revenue uplift", context: "Customer experience as a growth lever", description: "Generated annual VAS subscription revenue uplift through disciplined Six Sigma customer experience improvements." },
  { metric: "15%", title: "Under budget", context: "Complex delivery, accelerated", description: "Completed a four-partner BSS transformation for VoLTE in three months—among the fastest in the industry." },
];

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".impact-row", { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".impact-list", start: "top 82%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="achievements" ref={sectionRef} className="bg-card py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <header className="lg:col-span-4">
            <p className="section-label">03 / Impact</p>
            <h2 className="section-title">Outcomes at enterprise scale.</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Selected outcomes from transformation programs where technology strategy translated into measurable commercial value.
            </p>
          </header>

          <div className="impact-list border-t border-border lg:col-span-8">
            {achievements.map((item, index) => (
              <article key={item.title} className="impact-row grid gap-5 border-b border-border py-8 sm:grid-cols-[0.8fr_1.2fr] md:py-10">
                <div>
                  <p className="font-display text-6xl leading-none text-primary sm:text-7xl md:text-8xl">{item.metric}</p>
                  <h3 className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-foreground">{item.title}</h3>
                </div>
                <div className="sm:pt-2">
                  <p className="font-serif text-2xl leading-tight text-foreground">{item.context}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{item.description}</p>
                  <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Impact / 0{index + 1}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;