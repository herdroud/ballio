"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Identification from "@/components/landing/Identification";
import Solution from "@/components/landing/Solution";
import ConcreteChanges from "@/components/landing/ConcreteChanges";
import SocialProof from "@/components/landing/SocialProof";
import AntiObjections from "@/components/landing/AntiObjections";
import Offer from "@/components/landing/Offer";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <Hero />
      <Problem />
      <Identification />
      <Solution />
      <ConcreteChanges />
      <SocialProof />
      <AntiObjections />
      <Offer />
      <Footer />
    </div>
  );
}