"use client";

import { Card } from "@/components/ui/card";
import { UserPlus, Zap, ShoppingCart, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds with your email. No complex setup required.",
  },
  {
    number: "2",
    icon: Zap,
    title: "Set Up Store",
    description: "Customize your store in minutes using our intuitive builder.",
  },
  {
    number: "3",
    icon: ShoppingCart,
    title: "Add Products & Sell",
    description: "Upload your products and start accepting orders immediately.",
  },
];

export default function SolutionSection() {
  return (
    <section id="how-it-works" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How Vendly Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your store live in minutes, not months. Designed for simplicity, built for scale.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <div key={idx} className="relative">
                {/* Arrow connector - only on md screens */}
                {!isLast && (
                  <div className="hidden md:block absolute top-16 right-0 w-8 h-0.5 bg-linear-to-r from-primary/50 to-transparent transform translate-x-full" />
                )}

                <Card className="h-full p-6 sm:p-8 border-muted bg-card hover:border-primary/30 transition-colors">
                  {/* Step Number */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <Icon className="size-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Visual Flow on Mobile */}
        <div className="md:hidden flex flex-col gap-4 mb-12">
          {steps.map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 text-muted-foreground">
              {idx < steps.length - 1 && (
                <>
                  <ArrowRight className="size-5 rotate-90 text-primary" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
