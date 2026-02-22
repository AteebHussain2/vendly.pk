"use client";

import { Card } from "@/components/ui/card";
import { Users, Briefcase, Lightbulb } from "lucide-react";

const proofPoints = [
  {
    icon: Users,
    stat: "For Creators",
    description: "Designed by founders, for founders who want to focus on their craft—not software.",
  },
  {
    icon: Briefcase,
    stat: "For Small Businesses",
    description: "The all-in-one solution that grows with your business without breaking the bank.",
  },
  {
    icon: Lightbulb,
    stat: "For Makers",
    description: "Turn your passion into profit. Simple enough to start today, powerful enough to scale.",
  },
];

export default function SocialProofSection() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built for Your Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vendly is engineered specifically for the people who build great things.
          </p>
        </div>

        {/* Proof Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {proofPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <Card
                key={idx}
                className="p-6 sm:p-8 border-muted bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10">
                    <Icon className="size-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-3">{point.stat}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Trust Statement */}
        <div className="mt-16 text-center">
          <p className="text-lg text-foreground font-semibold mb-2">
            Join founders and small business owners who've already started building.
          </p>
          <p className="text-muted-foreground">
            No VC hype. No BS. Just solid software that works.
          </p>
        </div>
      </div>
    </section>
  );
}
