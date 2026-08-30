import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import plaquePhoto from "@/assets/awards/cio100-2024-plaque.jpg";
import stagePhoto from "@/assets/awards/cio100-2024-stage.jpg";

gsap.registerPlugin(ScrollTrigger);

const AwardsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".recognition-reveal", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="awards" ref={sectionRef} className="py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="section-container">
        <header className="recognition-reveal grid gap-6 border-b border-border pb-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p className="section-label">04 / Recognition</p>
            <h2 className="section-title">Leadership, recognized.</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7 md:text-base">
            Celebrating technology leadership that turns ambitious enterprise strategy into sustained, organization-wide progress.
          </p>
        </header>

        <article className="mt-12 md:mt-16">
          <div className="recognition-reveal grid gap-4 md:grid-cols-12">
            <figure className="md:col-span-8">
              <div className="aspect-[4/3] overflow-hidden bg-card md:aspect-[16/10]">
                <img src={plaquePhoto} alt="Omesh Bhujbal receiving the CIO100 Award 2024 on stage" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            </figure>
            <figure className="md:col-span-4 md:self-end">
              <div className="aspect-[4/3] overflow-hidden bg-card">
                <img src={stagePhoto} alt="CIO100 Awards stage announcing Omesh Bhujbal as a Progressive 100 Honoree" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">19th CIO100 Awards &amp; Symposium</figcaption>
            </figure>
          </div>

          <div className="recognition-reveal mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                <span>2024</span><span className="h-px w-8 bg-primary" /><span>Honoree</span>
              </div>
              <h3 className="mt-5 font-serif text-4xl leading-[1.02] text-foreground sm:text-5xl">CIO100 Award — 2024</h3>
              <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted-foreground">Presented by IDG Inc. · IDC Jury · Nexus Select Malls</p>
            </div>
            <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7 md:text-base">
              <p>Honored to receive the prestigious CIO100 Award — 2024 at the 19th edition of the CIO100 Awards and Symposium by IDG Inc.</p>
              <p>Grateful to be recognized among such esteemed industry leaders. This award is a testament to the relentless dedication and support of my amazing team at Nexus Select Malls and the trust from our management.</p>
              <p>A big thank you to the IDC jury for this recognition and for organizing such a remarkable event. It was an inspiring experience connecting with fellow winners and professionals from across the industry — seeing how organizations are leveraging IT to achieve success.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default AwardsSection;