import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ConnectSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".connect-content", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="connect" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="section-container">
        <div
          className="connect-content relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{
            background: "linear-gradient(135deg, hsl(217 91% 60% / 0.15), hsl(192 95% 55% / 0.1), hsl(217 91% 60% / 0.05))",
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl gradient-border" />

          <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4 font-medium relative z-10">
            Let's Connect
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 relative z-10">
            Ready to <span className="gradient-text">Collaborate?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed relative z-10">
            I'm always open to discussing technology strategy, digital transformation,
            and innovative solutions for enterprise challenges.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href="https://www.linkedin.com/in/omeshbhujbal/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-glow"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="section-container mt-20 pt-8 border-t border-border/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Omesh Bhujbal. All rights reserved.</p>
          <p className="font-display gradient-text font-medium">CTO · Innovator · Leader</p>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
