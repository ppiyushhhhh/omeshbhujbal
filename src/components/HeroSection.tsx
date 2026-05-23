import { motion } from "framer-motion";
import headshot from "@/assets/headshot.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="section-container text-center py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 group">
            <div className="absolute -inset-2 rounded-2xl bg-[conic-gradient(from_140deg,#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6,#ef4444)] opacity-80 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-700" />
            <div className="absolute -inset-0.5 rounded-2xl bg-[conic-gradient(from_140deg,#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6,#ef4444)]" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-background">
              <img
                src={headshot}
                alt="Omesh Bhujbal"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="section-label mb-8"
        >
          Chief Technology Officer
        </motion.p>


        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-normal text-foreground leading-[0.95] mb-8"
        >
          Omesh<br />Bhujbal
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="divider" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed mb-12 font-light"
        >
          22+ years driving digital transformation across telecom, retail, and manufacturing with enterprise-scale innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#experience" className="btn-primary">
            View Experience
          </a>
          <a
            href="https://www.linkedin.com/in/omeshb/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-foreground/20"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
