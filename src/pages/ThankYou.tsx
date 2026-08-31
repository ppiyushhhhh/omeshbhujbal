import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useReducedMotionPreference } from "@/hooks/use-reduced-motion-preference";

const ThankYou = () => {
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Message Sent Successfully | Omesh Bhujbal";

    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 flex items-center justify-center px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl text-center"
        >
          <div className="subtle-card p-8 md:p-12">
            <motion.div
              initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.1, ease: "backOut" }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 text-primary mb-8"
            >
              <CheckCircle className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            </motion.div>

            <h1 className="text-[1.75rem] sm:text-3xl md:text-4xl font-normal leading-tight mb-5">
              Message Sent Successfully
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
              Thank you for reaching out. Your message has been received successfully. I'll get back
              to you as soon as possible.
            </p>

            <Link to="/" className="btn-primary">
              Back to Portfolio
            </Link>

            <p className="mt-8 text-sm text-muted-foreground">
              I appreciate you taking the time to get in touch.
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="px-5 sm:px-6 lg:px-8 py-6 border-t border-border">
        <div className="max-w-5xl mx-auto text-center text-xs text-muted-foreground tracking-wider uppercase">
          © {new Date().getFullYear()} Omesh Bhujbal
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;
