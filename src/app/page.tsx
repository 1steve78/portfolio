"use client";

import Navbar from "@/components/Navbar";
import AgencyHero from "@/components/AgencyHero";
import LogoTicker from "@/components/LogoTicker";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import FooterSection from "@/components/FooterSection";
import AIChatbot from "@/components/AIChatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden relative">
      <Navbar />
      <AgencyHero />
      <LogoTicker />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
      <CTASection />
      <FooterSection />
      <AIChatbot />
    </div>
  );
}
