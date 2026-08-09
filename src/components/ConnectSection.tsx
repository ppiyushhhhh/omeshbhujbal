import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ConnectSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".connect-reveal", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case "name":
        return value.trim() === "" ? "Full name is required" : undefined;
      case "email":
        if (value.trim() === "") return "Email address is required";
        if (!emailRegex.test(value.trim())) return "Please enter a valid email address";
        return undefined;
      case "subject":
        return value.trim() === "" ? "Subject is required" : undefined;
      case "message":
        return value.trim() === "" ? "Message is required" : undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
    if (status !== "idle") setStatus("idle");
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, subject: true, message: true });
    if (!validateAll()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const payload = new FormData();
      // Web3Forms field names. Add your access_key when ready.
      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("subject", formData.subject.trim());
      payload.append("message", formData.message.trim());

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus("success");
        setStatusMessage("Thank you for reaching out. Your message has been sent successfully.");
        setFormData(initialFormData);
        setTouched({ name: false, email: false, subject: false, message: false });
        setErrors({});
      } else {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error ? error.message : "Submission failed. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="connect" ref={sectionRef} className="py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <div className="connect-reveal text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="section-label">Connect</p>
          <h2 className="section-title mb-6">Let's Connect</h2>
          <p className="text-muted-foreground leading-relaxed">
            Have a question, opportunity, or project in mind? Send me a message and I'll get back to
            you as soon as possible.
          </p>
        </div>

        <div className="connect-reveal max-w-3xl mx-auto">
          <div className="subtle-card">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    autoComplete="name"
                    className="h-12 rounded-lg bg-background"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    autoComplete="email"
                    className="h-12 rounded-lg bg-background"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can I help you?"
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  onBlur={() => handleBlur("subject")}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className="h-12 rounded-lg bg-background"
                />
                {errors.subject && (
                  <p id="subject-error" className="text-sm text-destructive">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, opportunity, or question..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  rows={5}
                  className="min-h-[140px] resize-y rounded-lg bg-background"
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>

              {status === "success" && (
                <div className="p-4 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm">
                  {statusMessage}
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-sm">
                  {statusMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="connect-reveal text-center max-w-2xl mx-auto mt-12 md:mt-16">
          <a
            href="https://www.linkedin.com/in/omeshb/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Connect on LinkedIn →
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="section-container mt-24 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wider uppercase">
          <p>© {new Date().getFullYear()} Omesh Bhujbal</p>
          <p>Mumbai, India</p>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
