import { ArrowUpRight } from "lucide-react";

const SiteFooter = () => (
  <footer className="border-t border-border bg-foreground text-background">
    <div className="section-container py-10 sm:py-12">
      <div className="grid gap-8 sm:grid-cols-2 sm:items-end">
        <div>
          <p className="font-serif text-3xl leading-none sm:text-4xl">Omesh Bhujbal</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/65">
            Vice President – Digital &amp; Information Technology
          </p>
        </div>
        <div className="flex flex-col gap-5 sm:items-end">
          <a
            href="https://www.linkedin.com/in/omeshb/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:text-background/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
          >
            LinkedIn <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <div className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.16em] text-background/55 sm:items-end">
            <p>Mumbai, India</p>
            <p>© {new Date().getFullYear()} Omesh Bhujbal</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;