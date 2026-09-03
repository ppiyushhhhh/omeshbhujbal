import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";
import plaquePhoto from "@/assets/awards/cio100-2024-plaque.jpg";
import stagePhoto from "@/assets/awards/cio100-2024-stage.jpg";

gsap.registerPlugin(ScrollTrigger);

type AwardImage = {
  src: string;
  alt: string;
  title: string;
  date: string;
};

const awardTitle = "CIO100 Award — 2024";
const awardDate = "2024 · 19th CIO100 Awards & Symposium";

const AwardsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedImage, setSelectedImage] = useState<AwardImage | null>(null);
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".recognition-reveal", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const openLightbox = (image: AwardImage) => setSelectedImage(image);

  return (
    <>
      <section id="awards" ref={sectionRef} className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-36">
        <span aria-hidden="true" className="pointer-events-none absolute -right-4 top-12 hidden select-none font-serif text-[17rem] leading-none text-foreground/[0.025] xl:block">
          24
        </span>

        <div className="section-container relative">
          <article className="grid gap-12 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:items-center md:gap-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-16">
            <div className="recognition-reveal relative z-10 md:py-10 lg:py-16">
              <p className="mb-10 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary sm:mb-12">
                04 / Recognition
              </p>

              <h2 className="font-serif text-[5.25rem] leading-[0.75] text-foreground sm:text-8xl md:text-[5.25rem] lg:text-[7rem] xl:text-[8rem]">
                CIO100
              </h2>
              <p className="mt-6 font-serif text-4xl leading-none text-foreground sm:text-5xl lg:text-6xl">Award</p>
              <p className="mt-2 font-serif text-4xl leading-none text-primary sm:text-5xl lg:text-6xl">2024</p>

              <div className="mt-12 max-w-sm sm:mt-16">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">Honoree</p>
                <p className="mt-3 text-[10px] uppercase leading-relaxed tracking-[0.17em] text-muted-foreground">
                  19th CIO100 Awards &amp; Symposium
                </p>
                <p className="mt-3 text-xs uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">
                  Presented by IDC / CIO100 Awards &amp; Symposium
                </p>
                <p className="mt-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Recognized for technology leadership and enterprise transformation.
                </p>
              </div>
            </div>

            <div className="recognition-reveal relative md:pb-20 lg:pb-24">
              <figure>
              <Button
                type="button"
                variant="ghost"
                aria-label={`Enlarge ${awardTitle} photograph`}
                onClick={() => openLightbox({
                  src: plaquePhoto,
                  alt: "Omesh Bhujbal receiving the CIO100 Award 2024 on stage",
                  title: awardTitle,
                  date: awardDate,
                })}
                  className="group h-auto w-full cursor-zoom-in rounded-none p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                  <span className="block aspect-[4/5] w-full overflow-hidden bg-card sm:aspect-[5/6] md:min-h-[38rem] lg:min-h-[44rem]">
                    <img src={plaquePhoto} alt="Omesh Bhujbal receiving the CIO100 Award 2024 on stage" loading="lazy" decoding="async" className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transform-none" />
                  </span>
                </Button>
              </figure>

              <figure className="mt-8 w-[78%] md:absolute md:-bottom-1 md:-left-8 md:mt-0 md:w-[46%] lg:-left-12 lg:w-[43%]">
                <Button
                  type="button"
                  variant="ghost"
                  aria-label={`Enlarge ${awardTitle} stage photograph`}
                  onClick={() => openLightbox({
                    src: stagePhoto,
                    alt: "CIO100 Awards stage announcing Omesh Bhujbal as a Progressive 100 Honoree",
                    title: awardTitle,
                    date: awardDate,
                  })}
                  className="group h-auto w-full cursor-zoom-in rounded-none border border-background bg-background p-1 shadow-sm hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="block aspect-[4/3] w-full overflow-hidden bg-card">
                    <img src={stagePhoto} alt="CIO100 Awards stage announcing Omesh Bhujbal as a Progressive 100 Honoree" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transform-none" />
                  </span>
                </Button>
              </figure>
            </div>
          </article>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="award-lightbox-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedImage(null);
          }}
        >
          <div className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden">
            <div className="mb-4 flex items-start justify-between gap-6 text-background">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-background/70">Recognition</p>
                <h2 id="award-lightbox-title" className="mt-1 font-serif text-2xl sm:text-3xl">{selectedImage.title}</h2>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-background/70">{selectedImage.date}</p>
              </div>
              <Button
                ref={closeButtonRef}
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close award photograph"
                onClick={() => setSelectedImage(null)}
                className="shrink-0 text-background hover:bg-background/10 hover:text-background focus-visible:ring-background"
              >
                <X aria-hidden="true" />
              </Button>
            </div>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
                className="max-h-[calc(100dvh-10rem)] w-full object-contain sm:max-h-[calc(100dvh-12rem)]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AwardsSection;