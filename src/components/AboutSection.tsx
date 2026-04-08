import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "22+", label: "Years Experience", icon: "⚡" },
  { value: "400M+", label: "Users Impacted", icon: "🌍" },
  { value: "Global", label: "Enterprise Projects", icon: "🏢" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-text", {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".stat-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="about-text">
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium">About</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Driving Digital
              <span className="gradient-text"> Transformation</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A seasoned technology leader with over 22 years of experience driving digital transformation
              across telecom, energy, and enterprise sectors. Passionate about leveraging AI/ML, Big Data,
              and cloud-native architectures to deliver scalable, high-impact solutions.
            </p>
            <p className="text-muted-foreground/70 leading-relaxed">
              From leading large-scale OSS/BSS transformations at Vodafone Idea to pioneering
              AI-driven analytics at enterprise scale, I bring a unique blend of strategic vision
              and hands-on technical expertise.
            </p>
          </div>

          {/* Stats */}
          <div ref={cardsRef} className="grid gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card glass-card-hover p-6 flex items-center gap-6">
                <div className="text-3xl w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10">
                  {stat.icon}
                </div>
                <div>
                  <p className="font-display text-3xl md:text-4xl font-bold gradient-text">
                    {stat.value}
                  </p>
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
