import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const AchievementsSection = lazy(() => import("@/components/AchievementsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const EducationSection = lazy(() => import("@/components/EducationSection"));
const ConnectSection = lazy(() => import("@/components/ConnectSection"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Suspense fallback={null}>
        <AboutSection />
        <ExperienceSection />
        <AchievementsSection />
        <SkillsSection />
        <EducationSection />
        <ConnectSection />
      </Suspense>
    </div>
  );
};

export default Index;
