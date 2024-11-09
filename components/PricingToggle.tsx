'use client'
import React, { useState } from "react";

type SupportLevel = "basic" | "priority";

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  users: string;
  storage: string;
  support: SupportLevel;
  availableFeatures: string[];
}

const PricingToggle = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const baseFeatures = {
    support: {
      basic: "Basic Support",
      priority: "Priority Support",
    } as const,
  };

  const additionalFeatures = [
    "Email Reports",
    "Advanced Analytics",
    "Custom Domains",
    "API Access",
    "SSO Authentication",
  ];

  const plans: Plan[] = [
    {
      name: "Basic",
      monthlyPrice: 9,
      annualPrice: 90,
      users: "1 User",
      storage: "10GB Storage",
      support: "basic",
      availableFeatures: ["Email Reports"],
    },
    {
      name: "Pro",
      monthlyPrice: 29,
      annualPrice: 290,
      users: "5 Users",
      storage: "100GB Storage",
      support: "priority",
      availableFeatures: [
        "Email Reports",
        "Advanced Analytics",
        "Custom Domains",
      ],
    },
    {
      name: "Enterprise",
      monthlyPrice: 99,
      annualPrice: 990,
      users: "Unlimited Users",
      storage: "1TB Storage",
      support: "priority",
      availableFeatures: [
        "Email Reports",
        "Advanced Analytics",
        "Custom Domains",
        "API Access",
        "SSO Authentication",
      ],
    },
  ];

  const getUnavailableFeatures = (plan: Plan) => {
    return additionalFeatures.filter(
      (feature) => !plan.availableFeatures.includes(feature)
    );
  };

  const renderFeatureItem = (feature: string, isAvailable: boolean) => (
    <li key={feature} className="flex items-center">
      <svg
        className={`h-4 w-4 mr-3 flex-shrink-0 ${
          isAvailable ? "text-blue-500" : "text-gray-300"
        }`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
      <span className={isAvailable ? "text-gray-600" : "text-gray-300"}>
        {feature}
      </span>
    </li>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-bold mb-8">Choose Your Plan</h2>
        <div className="relative flex items-center space-x-3">
          <span
            className={`text-sm transition-colors duration-200 ${
              !isAnnual ? "text-blue-600 font-bold" : "text-gray-600"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
            style={{ backgroundColor: isAnnual ? "#3B82F6" : "#E5E7EB" }}
            role="switch"
            aria-checked={isAnnual}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                isAnnual ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm transition-colors duration-200 ${
              isAnnual ? "text-blue-600 font-bold" : "text-gray-600"
            }`}
          >
            Annual <span className="ml-1 text-green-500 text-xs">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative p-6 bg-white rounded-xl border border-gray-200 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>

              <div className="flex items-baseline text-gray-900">
                <span className="text-2xl font-semibold">$</span>
                <span className="text-4xl font-bold tracking-tight transition-all duration-300">
                  {isAnnual
                    ? Math.round(plan.annualPrice / 12)
                    : plan.monthlyPrice}
                </span>
                <span className="ml-1 text-sm font-medium text-gray-500">
                  /month
                </span>
              </div>

              {isAnnual && (
                <p className="text-sm text-green-500">
                  ${plan.annualPrice} billed annually
                </p>
              )}

              <ul className="space-y-3 text-sm">
                {/* Core features */}
                {renderFeatureItem(plan.users, true)}
                {renderFeatureItem(plan.storage, true)}
                {renderFeatureItem(baseFeatures.support[plan.support], true)}

                {/* Available features */}
                {plan.availableFeatures.map((feature) =>
                  renderFeatureItem(feature, true)
                )}

                {/* Always show divider for consistent height */}
                <li className="border-t border-gray-200 my-4"></li>

                {/* Unavailable features */}
                {getUnavailableFeatures(plan).map((feature) =>
                  renderFeatureItem(feature, false)
                )}
              </ul>

              <button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingToggle;
