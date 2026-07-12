import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    const prevTitle = document.title;
    document.title = "Page Not Found | Omesh Bhujbal";

    const setMeta = (selector: string, attr: string, name: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute("content");
      el.setAttribute("content", content);
      return () => {
        if (prev === null) el?.remove();
        else el?.setAttribute("content", prev);
      };
    };

    const desc = "The page you're looking for doesn't exist. Return to Omesh Bhujbal's executive portfolio home.";
    const url = `https://omeshbhujbal.lovable.app${location.pathname}`;

    const restorers = [
      setMeta('meta[name="description"]', "name", "description", desc),
      setMeta('meta[property="og:title"]', "property", "og:title", "Page Not Found | Omesh Bhujbal"),
      setMeta('meta[property="og:description"]', "property", "og:description", desc),
      setMeta('meta[property="og:url"]', "property", "og:url", url),
      setMeta('meta[name="twitter:title"]', "name", "twitter:title", "Page Not Found | Omesh Bhujbal"),
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", desc),
      setMeta('meta[name="robots"]', "name", "robots", "noindex, follow"),
    ];

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    const prevCanonical = canonical?.getAttribute("href") ?? null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    return () => {
      document.title = prevTitle;
      restorers.forEach((r) => r());
      if (createdCanonical) canonical?.remove();
      else if (prevCanonical !== null) canonical?.setAttribute("href", prevCanonical);
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
