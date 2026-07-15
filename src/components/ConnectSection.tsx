import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ConnectSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".connect-reveal", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="connect" ref={sectionRef} className="py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <div className="connect-reveal text-center max-w-2xl mx-auto">
          <p className="section-label">Connect</p>
          <h2 className="section-title mb-6">Let's work together</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Open to discussing technology strategy, digital transformation, and innovative
            solutions for enterprise challenges across retail, telecom, and beyond.
          </p>
          <a
            href="https://www.linkedin.com/in/omeshb/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Connect on LinkedIn →
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="section-container mt-24 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wider uppercase">
          <p>© {new Date().getFullYear()} Omesh Bhujbal</p>
          <p>Mumbai, India</p>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
