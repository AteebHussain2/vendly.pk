"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section id="early-access" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-muted/20 to-background">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA Container */}
        <div className="rounded-lg border border-primary/30 bg-card/50 backdrop-blur-sm p-12 sm:p-16 text-center">
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Build Your Store in Minutes
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop overthinking. Stop overpaying. Join creators and entrepreneurs who've already built their dreams on Vendly.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="text-base font-semibold h-12 px-8 rounded-lg sm:text-lg"
              >
                Start Building Now
                <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>

          {/* Confidence Message */}
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">14-day free trial.</span> Cancel anytime. No questions asked.
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm text-muted-foreground">
            <Link href="privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="contact" className="hover:text-foreground transition-colors">
              Contact Us
            </Link>
            <Link href="status" className="hover:text-foreground transition-colors">
              Status Page
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Vendly. All rights reserved. Built by founders, for founders.
          </p>
        </div>
      </div>
    </section>
  );
}
