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
      <section id="awards" ref={sectionRef} className="overflow-hidden py-24 sm:py-28 md:py-32 lg:py-40">
        <div className="section-container relative">
          <article className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-8 md:gap-y-0 lg:gap-x-12 xl:gap-x-16">
            <div className="recognition-reveal order-1 md:col-span-5 md:col-start-1 md:row-start-1 md:flex md:min-h-[34rem] md:flex-col md:justify-center lg:min-h-[40rem]">
              <p className="mb-12 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary sm:mb-14 md:mb-20">
                04 / Recognition
              </p>

              <h2 className="font-serif text-[5.75rem] leading-[0.72] text-foreground min-[360px]:text-[6.35rem] sm:text-[8.5rem] md:text-[6.75rem] lg:text-[8.75rem] xl:text-[10.25rem]">
                CIO100
              </h2>
              <div className="mt-8 flex items-baseline gap-x-5 sm:mt-10 sm:gap-x-7 md:block">
                <p className="font-serif text-4xl leading-none text-foreground sm:text-5xl lg:text-6xl">Award</p>
                <p className="font-serif text-4xl leading-none text-primary sm:text-5xl md:mt-3 lg:text-6xl">2024</p>
              </div>
            </div>

            <div className="recognition-reveal order-3 max-w-md pt-2 md:col-span-4 md:col-start-1 md:row-start-2 md:pt-14 lg:pt-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground">Honoree</p>
              <p className="mt-4 text-[10px] uppercase leading-[1.7] tracking-[0.19em] text-muted-foreground">
                19th CIO100 Awards &amp; Symposium
              </p>
              <p className="mt-2 text-[10px] uppercase leading-[1.7] tracking-[0.15em] text-muted-foreground">
                Presented by IDC / CIO100 Awards &amp; Symposium
              </p>
              <p className="mt-8 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
                Recognized for technology leadership and enterprise transformation.
              </p>
            </div>

            <div className="contents md:relative md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:block md:pb-24 lg:pb-32">
              <figure className="recognition-reveal order-2 md:mt-10 lg:mt-0">
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
                  className="h-auto w-full cursor-zoom-in rounded-none p-0 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="block aspect-[4/3] w-full overflow-hidden bg-card sm:aspect-[3/2] md:aspect-[4/5] lg:aspect-[5/6] xl:aspect-[4/5]">
                    <img src={plaquePhoto} alt="Omesh Bhujbal receiving the CIO100 Award 2024 on stage" loading="lazy" decoding="async" className="h-full w-full object-cover object-[55%_center]" />
                  </span>
                </Button>
              </figure>

              <figure className="recognition-reveal order-4 ml-auto w-[88%] sm:w-[72%] md:absolute md:bottom-0 md:-left-10 md:w-[52%] lg:-left-16 lg:w-[48%] xl:-left-20 xl:w-[46%]">
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
                  className="h-auto w-full cursor-zoom-in rounded-none border border-background bg-background p-1 shadow-sm hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="block aspect-[3/2] w-full overflow-hidden bg-card">
                    <img src={stagePhoto} alt="CIO100 Awards stage announcing Omesh Bhujbal as a Progressive 100 Honoree" loading="lazy" decoding="async" className="h-full w-full object-cover" />
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