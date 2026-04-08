import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    metric: "30%",
    title: "Cost Reduction",
    description: "Achieved significant operational cost savings through cloud migration and process automation across enterprise systems.",
    icon: "📉",
  },
  {
    metric: "400M+",
    title: "Users Handled",
    description: "Managed technology infrastructure supporting over 400 million telecom subscribers with 99.9% uptime.",
    icon: "👥",
  },
  {
    metric: "AI/ML",
    title: "Transformations",
    description: "Pioneered AI and machine learning adoption for predictive analytics, customer insights, and network optimization.",
    icon: "🤖",
  },
  {
    metric: "2000+",
    title: "KPI BI System",
    description: "Built and managed enterprise BI platform tracking 2000+ KPIs for real-time business intelligence and decision making.",
    icon: "📊",
  },
];

const AchievementCard = ({ achievement, index }: { achievement: typeof achievements[0]; index: number }) => {
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
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
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

        <div className="achievements-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, i) => (
            <AchievementCard key={i} achievement={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
