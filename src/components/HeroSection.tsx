import { motion } from "framer-motion";
import headshot from "@/assets/headshot.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="section-container py-24 sm:py-28 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Photo - left */}
          <div className="md:col-span-5 group/combo flex flex-col items-center md:items-start gap-8 w-full [perspective:1200px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="transition-transform duration-700 ease-out will-change-transform group-hover/combo:[transform:rotateX(6deg)_rotateY(-6deg)_translateY(-0.5rem)]"
            >
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80">
                <div className="absolute -inset-2 rounded-2xl bg-[conic-gradient(from_140deg,#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6,#ef4444)] opacity-80 blur-md transition-all duration-700 group-hover/combo:opacity-100 group-hover/combo:blur-xl group-hover/combo:-inset-3" />
                <div className="absolute -inset-0.5 rounded-2xl bg-[conic-gradient(from_140deg,#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6,#ef4444)]" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-background">
                  <img
                    src={headshot}
                    alt="Omesh Bhujbal"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/combo:scale-105"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-6 sm:gap-8 md:gap-10 justify-center md:justify-start transition-all duration-700 ease-out will-change-transform group-hover/combo:[transform:rotateX(4deg)_rotateY(-4deg)_translateY(-0.25rem)] group-hover/combo:drop-shadow-[0_10px_25px_hsl(var(--foreground)/0.18)]"
            >
              {[
                { value: "22+", label: "Years" },
                { value: "400M+", label: "Users Impacted" },
                { value: "Global", label: "Delivery" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-2xl md:text-3xl text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>




          {/* Text - right */}
          <div className="md:col-span-7 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="section-label mb-6"
            >
              Chief Technology Officer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-serif text-[2.75rem] sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-foreground leading-[0.95] mb-8 break-words"
            >
              Omesh<br />Bhujbal
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex justify-center md:justify-start mb-8"
            >
              <div className="divider" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed mb-10 font-light"
            >
              22+ years driving digital transformation across telecom, retail, and manufacturing with enterprise-scale innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
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
        </div>
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
