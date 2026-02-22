"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/5 to-background dark:from-primary/10" />

      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-foreground">
            <Sparkles className="size-4 text-primary" />
            <span>Launching Soon</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Launch Your Online Store in{" "}
          <span className="bg-linear-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            3 Clicks
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mb-8 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
          No plugins. No complexity. No hefty bills. Start selling online today with Vendly—the
          e-commerce platform built for creators, makers, and small business owners.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="text-base font-semibold h-12 px-8 rounded-lg"
            asChild
          >
            <Link href="/auth/signup">
              Start Free
              <ArrowRight className="size-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base font-semibold h-12 px-8 rounded-lg"
            asChild
          >
            <Link href="#how-it-works">See How It Works</Link>
          </Button>
        </div>

        {/* Trust indicator */}
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">No credit card required.</span> Get started
          risk-free today.
        </p>
      </div>
    </section>
  );
}
