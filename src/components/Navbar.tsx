import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Achievements", href: "#achievements", id: "achievements" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Connect", href: "#connect", id: "connect" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const getSections = () =>
      navItems
        .map((i) => document.getElementById(i.id))
        .filter((el): el is HTMLElement => !!el);

    let ticking = false;
    let rafId: number | null = null;

    const computeActive = () => {
      const sections = getSections();
      if (sections.length === 0) return;
      const offset = 100; // header + a little breathing room
      const scrollY = window.scrollY;

      // If near bottom of page, activate last section
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      let current = sections[0].id;
      for (const sec of sections) {
        const top = sec.getBoundingClientRect().top + scrollY;
        if (top - offset <= scrollY) {
          current = sec.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    const updateActive = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        computeActive();
        ticking = false;
        rafId = null;
      });
    };

    computeActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setMobileOpen(false);
    const headerOffset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-[0_10px_30px_-10px_rgba(0,0,0,0.18)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`section-container flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
        }`}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.replaceState(null, "", " ");
          }}
          className={`font-serif text-foreground transition-all duration-500 ${
            scrolled ? "text-lg" : "text-xl"
          }`}
        >
          Omesh Bhujbal
        </a>

        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative text-xs uppercase tracking-[0.15em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-foreground after:transition-all after:duration-300 ${
                  isActive
                    ? "text-foreground after:w-full"
                    : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="md:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          <span className={`w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1" : ""}`} />
          <span className={`w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-px bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          id="mobile-nav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="md:hidden overflow-hidden bg-background/95 backdrop-blur-lg border-t border-border/50"
        >
          <div className="section-container py-6 flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
