"use client";

import { AlertCircle, Zap, Frown } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: AlertCircle,
    title: "Plugin Chaos",
    description: "Managing dozens of plugins drains your time and money, with compatibility issues and constant updates.",
  },
  {
    icon: Frown,
    title: "Overwhelming Complexity",
    description: "Most platforms require technical expertise. Setting up your store shouldn't feel like rocket science.",
  },
  {
    icon: Zap,
    title: "Hidden Costs",
    description: "Unexpected fees pile up fast. Transaction charges, plugin subscriptions, hosting—it never ends.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Problem with Traditional E-Commerce
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Setting up an online store shouldn't drain your budget, time, or sanity. Yet most platforms do exactly that.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <Card
                key={idx}
                className="p-6 sm:p-8 border-muted bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors"
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-destructive/10">
                    <Icon className="size-6 text-destructive" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{problem.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
