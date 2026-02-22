"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
    {
        name: "Starter",
        price: "Free",
        period: "Three months, then $0.99/month",
        description: "Perfect for testing the waters",
        features: [
            "Up to 100 products",
            "Basic store customization",
            "AI recommendations (limited)",
            "Essential analytics",
            "Community support",
        ],
        cta: "Start for Free",
        highlight: false,
    },
    {
        name: "Professional",
        price: "$9.99",
        period: "/month",
        description: "For growing businesses",
        features: [
            "Unlimited products",
            "Advanced store customization",
            "AI recommendations",
            "Priority support",
            "Custom domain",
            "Inventory management",
        ],
        cta: "Try Free",
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "Per your needs",
        description: "For large-scale operations",
        features: [
            "Everything in Professional",
            "Advanced analytics & reporting",
            "API access",
            "Dedicated account manager",
            "Custom integrations",
            "SLA guarantee",
        ],
        cta: "Contact Sales",
        highlight: false,
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 scroll-mt-16">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Start free, scale affordably. No hidden fees. No surprises.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {pricingPlans.map((plan, idx) => (
                        <Card
                            key={idx}
                            className={`relative p-8 flex flex-col h-full transition-all duration-200 ${plan.highlight
                                    ? "border-primary bg-card shadow-lg scale-105 md:scale-100 md:ring-2 md:ring-primary/30"
                                    : "border-muted bg-card/50 backdrop-blur-sm hover:border-primary/30"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.highlight && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                                </div>
                            )}

                            {/* Plan Name */}
                            <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                            <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                            {/* Pricing */}
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                <span className="text-muted-foreground text-sm ml-2">{plan.period}</span>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 mb-8 grow">
                                {plan.features.map((feature, featureIdx) => (
                                    <li key={featureIdx} className="flex gap-3 items-start">
                                        <Check className="size-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-foreground text-sm leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Button
                                className="w-full h-10 rounded-lg font-semibold"
                                variant={plan.highlight ? "default" : "outline"}
                                asChild
                            >
                                <a href="#early-access">{plan.cta}</a>
                            </Button>
                        </Card>
                    ))}
                </div>

                {/* Trust Message */}
                <div className="text-center">
                    <p className="text-muted-foreground">
                        All plans include a <span className="font-semibold text-foreground">14-day free trial</span>. No credit card
                        needed to start.
                    </p>
                </div>
            </div>
        </section>
    );
}