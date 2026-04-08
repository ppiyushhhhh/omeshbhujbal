import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ParticleField from "./ParticleField";

const HeroSection = () => {
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!taglineRef.current) return;
    const words = taglineRef.current.querySelectorAll(".word");
    gsap.fromTo(
      words,
      { opacity: 0, y: 20, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: 0.08,
        delay: 1.2,
        ease: "power3.out",
      }
    );
  }, []);

  const tagline = "Senior Technology Leader driving digital transformation across Telecom, Retail, and Manufacturing with 22+ years of enterprise innovation.";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      <div className="absolute inset-0 z-[1]" style={{
        background: "radial-gradient(ellipse at 30% 50%, hsl(217 91% 60% / 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, hsl(192 95% 55% / 0.06) 0%, transparent 50%)"
      }} />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm md:text-base uppercase tracking-[0.3em] text-primary mb-6 font-medium"
          >
            Chief Technology Officer
          </motion.p>

          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="block text-foreground"
            >
              Omesh
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="block gradient-text"
            >
              Bhujbal
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-base md:text-lg text-muted-foreground mb-4"
          >
            Digital Transformation Leader · Retail · Telecom · Manufacturing
          </motion.p>

          <p ref={taglineRef} className="text-sm md:text-base text-muted-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            {tagline.split(" ").map((word, i) => (
              <span key={i} className="word inline-block opacity-0 mr-[0.3em]">
                {word}
              </span>
            ))}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#experience" className="btn-primary-glow">
              View Experience
            </a>
            <a
              href="https://www.linkedin.com/in/omeshb/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-glow"
            >
              Connect on LinkedIn
            </a>
          </motion.div>
        </motion.div>

        <div className="absolute top-1/4 left-[10%] w-20 h-20 rounded-full border border-primary/10 animate-float opacity-30" />
        <div className="absolute bottom-1/3 right-[15%] w-32 h-32 rounded-full border border-accent/10 animate-float opacity-20" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-[10%] w-2 h-2 rounded-full bg-primary/40 animate-pulse-glow" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
