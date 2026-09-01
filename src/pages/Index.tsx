import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SiteFooter from "@/components/SiteFooter";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const AchievementsSection = lazy(() => import("@/components/AchievementsSection"));
const AwardsSection = lazy(() => import("@/components/AwardsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const ConnectSection = lazy(() => import("@/components/ConnectSection"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <ExperienceSection />
          <AchievementsSection />
          <AwardsSection />
          <SkillsSection />
          <EducationSection />
          <ConnectSection />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
