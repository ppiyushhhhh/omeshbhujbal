import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";
import plaquePhoto from "@/assets/awards/cio100-2024-plaque.jpg";
import stagePhoto from "@/assets/awards/cio100-2024-stage.jpg";

gsap.registerPlugin(ScrollTrigger);

type AwardImage = {
  src: string;
  alt: string;
};

type Award = {
  title: string;
  year: string;
  organization: string;
  description: string;
  images: AwardImage[];
};

const awards: Award[] = [
  {
    title: "CIO100 Award",
    year: "2024",
    organization: "19th CIO100 Awards & Symposium",
    description: "Recognized for technology leadership and enterprise transformation.",
    images: [
      {
        src: plaquePhoto,
        alt: "Omesh Bhujbal receiving the CIO100 Award 2024 on stage",
      },
      {
        src: stagePhoto,
        alt: "CIO100 Awards stage announcing Omesh Bhujbal as a Progressive 100 Honoree",
      },
    ],
  },
];

type AwardCardProps = {
  award: Award;
  onOpen: () => void;
};

const AwardCard = ({ award, onOpen }: AwardCardProps) => {
  const photoLabel = `${award.images.length} ${award.images.length === 1 ? "Photo" : "Photos"}`;

  return (
    <article className="award-reveal overflow-hidden border border-border bg-card">
      <Button
        type="button"
        variant="ghost"
        onClick={onOpen}
        aria-label={`Open ${award.title} ${award.year} gallery`}
        className="group h-auto w-full flex-col items-stretch justify-start rounded-none p-0 text-left hover:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="relative block aspect-[16/10] w-full overflow-hidden bg-muted sm:aspect-[3/2]">
          <img
            src={award.images[0]?.src}
            alt={award.images[0]?.alt ?? `${award.title} ${award.year}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.018] motion-reduce:transform-none"
          />
          <span className="absolute bottom-0 right-0 bg-background px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground">
            {photoLabel}
          </span>
        </span>

        <span className="grid w-full gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-7 md:p-8">
          <span className="block min-w-0">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              {award.organization}
            </span>
            <span className="mt-3 block font-serif text-3xl leading-none text-foreground sm:text-4xl">
              {award.title}
            </span>
            <span className="mt-4 block max-w-2xl text-sm font-normal leading-relaxed text-muted-foreground sm:text-base">
              {award.description}
            </span>
          </span>
          <span className="block self-start font-serif text-3xl leading-none text-primary sm:text-4xl">
            {award.year}
          </span>
        </span>
      </Button>
    </article>
  );
};

const AwardsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const [activeAwardIndex, setActiveAwardIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const reducedMotion = useReducedMotionPreference();
  const activeAward = activeAwardIndex === null ? null : awards[activeAwardIndex];

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".award-reveal",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!activeAward) return;

    const previousOverflow = document.body.style.overflow;
    const imageCount = activeAward.images.length;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveAwardIndex(null);
      if (event.key === "ArrowLeft") {
        setActiveImageIndex((current) => (current - 1 + imageCount) % imageCount);
      }
      if (event.key === "ArrowRight") {
        setActiveImageIndex((current) => (current + 1) % imageCount);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeAward]);

  const openAward = (index: number) => {
    setActiveAwardIndex(index);
    setActiveImageIndex(0);
  };

  const closeGallery = () => setActiveAwardIndex(null);

  const showPreviousImage = () => {
    if (!activeAward) return;
    setActiveImageIndex((current) => (current - 1 + activeAward.images.length) % activeAward.images.length);
  };

  const showNextImage = () => {
    if (!activeAward) return;
    setActiveImageIndex((current) => (current + 1) % activeAward.images.length);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || !activeAward || activeAward.images.length < 2) return;
    const distance = event.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(distance) < 45) return;
    if (distance > 0) showPreviousImage();
    else showNextImage();
  };

  const activeImage = activeAward?.images[activeImageIndex];

  return (
    <>
      <section id="awards" ref={sectionRef} className="bg-background py-20 sm:py-24 md:py-28">
        <div className="section-container">
          <header className="award-reveal mb-10 grid gap-4 border-b border-border pb-7 sm:mb-12 sm:grid-cols-[1fr_auto] sm:items-end md:mb-14">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">04 / Recognition</p>
              <h2 className="mt-4 font-serif text-4xl leading-none text-foreground sm:text-5xl md:text-6xl">
                Awards &amp; Recognition
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-right">
              Recognition for enterprise technology leadership and transformation.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {awards.map((award, index) => (
              <AwardCard
                key={`${award.title}-${award.year}`}
                award={award}
                onOpen={() => openAward(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeAward && activeImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="award-gallery-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <div className="flex max-h-full w-full max-w-6xl flex-col overflow-hidden text-background">
            <div className="mb-4 flex items-start justify-between gap-5">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-background/65">
                  {activeAward.organization}
                </p>
                <h2 id="award-gallery-title" className="mt-1 font-serif text-2xl leading-tight sm:text-3xl">
                  {activeAward.title} — {activeAward.year}
                </h2>
                <p className="mt-1 hidden max-w-2xl text-sm text-background/70 sm:block">
                  {activeAward.description}
                </p>
              </div>
              <Button
                ref={closeButtonRef}
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close award gallery"
                onClick={closeGallery}
                className="shrink-0 text-background hover:bg-background/10 hover:text-background focus-visible:ring-background"
              >
                <X aria-hidden="true" />
              </Button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-background/5"
              onTouchStart={(event) => {
                touchStartXRef.current = event.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={handleTouchEnd}
            >
              <img
                key={activeImage.src}
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-h-[calc(100dvh-12rem)] w-full object-contain sm:max-h-[calc(100dvh-14rem)] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
              />

              {activeAward.images.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Previous award photograph"
                    onClick={showPreviousImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-foreground/65 text-background hover:bg-foreground/85 hover:text-background focus-visible:ring-background sm:left-4"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Next award photograph"
                    onClick={showNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground/65 text-background hover:bg-foreground/85 hover:text-background focus-visible:ring-background sm:right-4"
                  >
                    <ChevronRight aria-hidden="true" />
                  </Button>
                </>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/65">
              <span>{activeImageIndex + 1} / {activeAward.images.length}</span>
              <span className="truncate">{activeImage.alt}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AwardsSection;