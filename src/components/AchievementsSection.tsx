import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    metric: "30%",
    title: "Cost Reduction Target",
    description: "Targeted 30% operational cost reduction through CVM transformation leveraging AI, ML, and digital technologies for 400M customers.",
    icon: "📉",
  },
  {
    metric: "400M",
    title: "Customers Managed",
    description: "Led CVM transformation for 400 million telecom customers — the largest telco CVM implementation — with omni-channel platform delivery.",
    icon: "👥",
  },
  {
    metric: "2000+",
    title: "KPI MIS Rollout",
    description: "Rolled out 'One MIS' transformation with 2000 critical KPIs across the organization via unified DWH, Big Data, and performance dashboards.",
    icon: "📊",
  },
  {
    metric: "4x",
    title: "Online Recharge Growth",
    description: "Drove 4x growth in online recharge transactions and 1M number portability requests through digital services transformation.",
    icon: "🚀",
  },
  {
    metric: "₹320M",
    title: "Revenue Uplift",
    description: "Achieved ₹320M annual revenue increase in VAS subscriptions through CX and technical improvements via Six Sigma initiatives.",
    icon: "💰",
  },
  {
    metric: "15%",
    title: "Under Budget Delivery",
    description: "Delivered fastest BSS transformation for IMS VoLTE launch — completed in 3 months with 4 partners, 15% under budget.",
    icon: "⚡",
  },
];

const AchievementCard = ({ achievement }: { achievement: typeof achievements[0] }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className="achievement-card glass-card-hover p-8 cursor-default"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="text-3xl mb-4 w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10">
        {achievement.icon}
      </div>
      <p className="font-display text-4xl font-bold gradient-text mb-2">{achievement.metric}</p>
      <h3 className="font-display text-lg font-semibold text-foreground mb-3">{achievement.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
    </div>
  );
};

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".achievement-card", {
        opacity: 0, y: 50, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".achievements-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">Impact</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Key <span className="gradient-text">Achievements</span>
          </h2>
        </div>
        <div className="achievements-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <AchievementCard key={i} achievement={a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
