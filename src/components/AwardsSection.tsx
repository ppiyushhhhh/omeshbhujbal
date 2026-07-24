import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import plaquePhoto from "@/assets/awards/cio100-2024-plaque.jpg";
import stagePhoto from "@/assets/awards/cio100-2024-stage.jpg";

gsap.registerPlugin(ScrollTrigger);

const AwardsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  // Mouse-tracked tilt + glow
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [4, -4]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 150, damping: 18 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      tl.fromTo(
        ".award-anim",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
      ).fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
        "-=0.3"
      ).fromTo(
        ".award-photo",
        { opacity: 0, scale: 1.05, filter: "blur(6px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.15, ease: "power2.out" },
        "-=0.6"
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="awards" ref={sectionRef} className="py-16 sm:py-20 md:py-28 lg:py-32 bg-background">
      <div className="section-container">
        <p className="section-label award-anim">Recognition</p>
        <h2 className="section-title mb-14 award-anim">Awards &amp; honors</h2>

        <motion.article
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200, transformStyle: "preserve-3d" }}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="group relative rounded-2xl border border-border bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)] overflow-hidden transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]"
        >
          {/* Cursor-tracked glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) =>
                  `radial-gradient(500px circle at ${x} ${y}, hsl(var(--foreground) / 0.08), transparent 60%)`
              ),
            }}
          />

          <div className="relative grid lg:grid-cols-2 gap-0" style={{ transform: "translateZ(0)" }}>
            {/* Photos */}
            <div className="relative p-6 sm:p-8 md:p-10 bg-muted/40">
              <div className="relative aspect-[4/3] w-full">
                <div className="award-photo absolute inset-0 rounded-xl overflow-hidden border border-border shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                  <img
                    src={plaquePhoto}
                    alt="Omesh Bhujbal receiving the CIO100 Award 2024 on stage"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="award-photo absolute -bottom-6 -right-2 sm:-right-4 w-1/2 aspect-[16/10] rounded-xl overflow-hidden border-4 border-card shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  <img
                    src={stagePhoto}
                    alt="CIO100 Awards stage announcing Omesh Bhujbal, The Progressive 100 Honoree 2024, Nexus Select Malls"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  2024
                </span>
                <span className="inline-flex items-center rounded-full bg-foreground text-background px-3 py-1 text-xs uppercase tracking-[0.15em]">
                  Honoree
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight mb-2">
                CIO100 Award &mdash; 2024
              </h3>
              <p className="text-sm text-muted-foreground uppercase tracking-[0.15em] mb-1">
                19th CIO100 Awards &amp; Symposium
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Presented by IDG Inc. &middot; IDC Jury &middot; Nexus Select Malls
              </p>

              <div className="space-y-4 text-[15px] md:text-base text-foreground/80 leading-relaxed">
                <p>
                  Honored to receive the prestigious CIO100 Award &mdash; 2024 at the 19th edition of the
                  CIO100 Awards and Symposium by IDG Inc.
                </p>
                <p>
                  Grateful to be recognized among such esteemed industry leaders. This award is a testament
                  to the relentless dedication and support of my amazing team at Nexus Select Malls and the
                  trust from our management.
                </p>
                <p>
                  A big thank you to the IDC jury for this recognition and for organizing such a remarkable
                  event. It was an inspiring experience connecting with fellow winners and professionals from
                  across the industry &mdash; seeing how organizations are leveraging IT to achieve success.
                </p>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default AwardsSection;
