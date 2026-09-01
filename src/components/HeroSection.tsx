import { motion, useReducedMotion } from "framer-motion";
import headshot from "@/assets/headshot.jpg";

const statistics = [
  { value: "22+", label: "Years in technology leadership" },
  { value: "400M+", label: "Customers impacted at scale" },
  { value: "Global", label: "Multi-market delivery experience" },
];

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative min-h-[92vh] border-b border-border pt-24 sm:pt-28 lg:pt-32">
      <div className="section-container flex min-h-[calc(92vh-6rem)] flex-col justify-between pb-10 sm:pb-14">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-7 lg:pr-6">
            <motion.p {...reveal(0.1)} className="section-label mb-7">
              Vice President – Digital &amp; Information Technology
            </motion.p>
            <motion.h1
              {...reveal(0.2)}
              className="max-w-4xl break-words font-serif text-5xl font-normal leading-[0.9] text-foreground min-[360px]:text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[7.25rem]"
            >
              Omesh<br />Bhujbal
            </motion.h1>
            <motion.p
              {...reveal(0.35)}
              className="mt-8 max-w-2xl font-serif text-3xl leading-[1.05] text-foreground sm:text-4xl lg:text-5xl"
            >
              Building technology ecosystems that scale.
            </motion.p>
            <motion.p
              {...reveal(0.45)}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Technology executive shaping digital transformation, AI, data, and enterprise platforms across hospitality, retail, telecom, and manufacturing.
            </motion.p>
            <motion.div {...reveal(0.55)} className="mt-9 flex flex-wrap gap-4">
              <a href="#experience" className="btn-primary">View experience</a>
              <a href="https://www.linkedin.com/in/omeshb/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                LinkedIn ↗
              </a>
            </motion.div>
          </div>

          <motion.figure
            {...reveal(0.25)}
            className="order-1 ml-auto w-[78%] max-w-sm lg:order-2 lg:col-span-5 lg:w-full lg:max-w-md"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-card">
              <img
                src={headshot}
                alt="Omesh Bhujbal, technology executive"
                width={640}
                height={800}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Technology leadership</span>
              <span>Mumbai, India</span>
            </figcaption>
          </motion.figure>
        </div>

        <motion.div
          {...reveal(0.7)}
          className="mt-12 grid border-y border-border sm:grid-cols-3 lg:mt-16"
          aria-label="Career statistics"
        >
          {statistics.map((stat, index) => (
            <div key={stat.label} className={`py-5 sm:px-7 sm:py-6 ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}>
              <p className="font-serif text-3xl text-primary md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;