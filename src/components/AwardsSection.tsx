import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import plaquePhoto from "@/assets/awards/cio100-2024-plaque.jpg";
import stagePhoto from "@/assets/awards/cio100-2024-stage.jpg";

gsap.registerPlugin(ScrollTrigger);

const AwardsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".award-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="awards" ref={sectionRef} className="py-16 sm:py-20 md:py-28 lg:py-32 bg-background">
      <div className="section-container">
        <p className="section-label award-anim">Recognition</p>
        <h2 className="section-title mb-14 award-anim">Awards &amp; honors</h2>

        <article className="award-anim rounded-2xl border border-border bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Photos */}
            <div className="relative p-6 sm:p-8 md:p-10 bg-muted/40">
              <div className="relative aspect-[4/3] w-full">
                <div className="absolute inset-0 rounded-xl overflow-hidden border border-border shadow-lg transition-transform duration-500 hover:-translate-y-1">
                  <img
                    src={plaquePhoto}
                    alt="Omesh Bhujbal receiving the CIO100 Award 2024 on stage"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-2 sm:-right-4 w-1/2 aspect-[16/10] rounded-xl overflow-hidden border-4 border-card shadow-xl transition-transform duration-500 hover:-translate-y-1">
                  <img
                    src={stagePhoto}
                    alt="CIO100 Awards stage announcing Omesh Bhujbal, The Progressive 100 Honoree 2024, Nexus Select Malls"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
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
        </article>
      </div>
    </section>
  );
};

export default AwardsSection;
