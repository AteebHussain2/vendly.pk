"use client";

import { Card } from "@/components/ui/card";
import { MessageCircle, Lightbulb, TrendingUp, Package, Zap } from "lucide-react";

const features = [
  {
    icon: MessageCircle,
    title: "Built-in Chat",
    description: "Engage customers in real-time. No plugins needed—chat is baked into your store.",
  },
  {
    icon: Lightbulb,
    title: "AI Recommendations",
    description: "Smart product suggestions that increase average order value automatically.",
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Track sales, traffic, and customer behavior with crystal-clear insights.",
  },
  {
    icon: Package,
    title: "Inventory & Orders",
    description: "Manage stock levels and orders from one unified dashboard.",
  },
  {
    icon: Zap,
    title: "Built-in Everything",
    description: "Payments, shipping, email notifications—all included. No plugins required.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need, Nothing You Don't
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five powerful features that scale with your business—no plugins, no bloat, no surprises.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="p-6 sm:p-8 border-muted bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-200"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Value Proposition */}
        <div className="mt-16 p-8 rounded-lg border border-muted bg-muted/30">
          <p className="text-center text-lg text-foreground">
            <span className="font-semibold">No learning curve.</span> No technical skills required.{" "}
            <span className="font-semibold">Pure selling power.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
