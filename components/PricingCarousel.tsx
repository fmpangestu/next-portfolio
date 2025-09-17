"use client";
import { useState, useEffect, useRef } from "react";
import { Check, Zap } from "lucide-react";
import { useTranslation } from "next-i18next";

type Plan = {
  name: string;
  description: string;
  price: string;
  label: string;
  popular?: boolean;
  isHighlight?: boolean;
  features: string[];
};

const PricingCarousel = () => {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const myWhatsAppNumber = "6283199412171";

  const handleSelectPlan = (planName: string) => {
    const message = t("pricing.whatsappMessage", { planName });
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`, "_blank");
  };

  const pricingPlans: Plan[] = [
    {
      name: t("pricing.plans.companyProfile.name"),
      description: t("pricing.plans.companyProfile.description"),
      price: "3jt",
      label: t("pricing.specialRate"),
      features: [
        t("pricing.features.webDesign"),
        t("pricing.features.customDomain"),
        t("pricing.features.storage", { size: "500MB" }),
        t("pricing.features.unlimitedBandwidth"),
        t("pricing.features.ssl"),
        t("pricing.features.maintenance"),
        t("pricing.features.backup"),
      ],
    },
    {
      name: t("pricing.plans.onlineStore.name"),
      description: t("pricing.plans.onlineStore.description"),
      price: "5jt",
      label: t("pricing.specialRate"),
      popular: true,
      features: [
        t("pricing.features.dashboard"),
        t("pricing.features.webDesign"),
        t("pricing.features.customDomain"),
        t("pricing.features.storage", { size: "1GB" }),
        t("pricing.features.unlimitedBandwidth"),
        t("pricing.features.ssl"),
        t("pricing.features.maintenance"),
        t("pricing.features.backup"),
      ],
    },
    {
      name: t("pricing.plans.customWeb.name"),
      description: t("pricing.plans.customWeb.description"),
      price: "15jt",
      label: t("pricing.upTo"),
      isHighlight: true,
      features: [
        t("pricing.features.dashboard"),
        t("pricing.features.storageCustom"),
        t("pricing.features.featuresCustom"),
        t("pricing.features.webDesign"),
        t("pricing.features.customDomain"),
        t("pricing.features.unlimitedBandwidth"),
        t("pricing.features.ssl"),
        t("pricing.features.maintenance"),
        t("pricing.features.backup"),
      ],
    },
  ];

  // Hitung index terdekat saat di-scroll
  const handleScroll = () => {
    if (!trackRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = trackRef.current!;
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setCurrentIndex(Math.max(0, Math.min(idx, pricingPlans.length - 1)));
    });
  };

  // Klik dot => scroll halus ke slide tertentu
  const scrollToIndex = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({
      left: idx * el.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="md:hidden mx-2 rounded-md z-40 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 shadow-2xl">
      {/* Header */}
      <div className="text-center py-4 px-4 border-b border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {t("pricing.title")}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {t("pricing.subtitle")}
        </p>
      </div>

      {/* Track scroll-snap (swipe kanan/kiri) */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="
          relative overflow-x-auto no-scrollbar
          snap-x snap-mandatory scroll-smooth
          w-full
        "
        // padding di luar track biar sama seperti versi lama
      >
        <div className="flex w-full">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className="snap-center shrink-0 w-full px-4 py-6"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${pricingPlans.length}`}
            >
              <div
                className={`rounded-xl p-4 ${
                  plan.isHighlight
                    ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
                    : "bg-gray-50 dark:bg-slate-800"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="text-center mb-3">
                    <span className="bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                      {t("pricing.popular")}
                    </span>
                  </div>
                )}

                {/* Header plan */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center mb-2">
                    {plan.isHighlight && <Zap className="w-4 h-4 mr-1" />}
                    <h4
                      className={`text-lg font-bold ${
                        plan.isHighlight ? "text-white" : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {plan.name}
                    </h4>
                  </div>

                  <p
                    className={`text-xs mb-3 ${
                      plan.isHighlight ? "text-blue-100" : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline justify-center mb-1">
                    <span
                      className={`text-xs mr-1 ${
                        plan.isHighlight ? "text-blue-200" : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {t("pricing.currency")}
                    </span>
                    <span
                      className={`text-2xl font-bold ${
                        plan.isHighlight ? "text-white" : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {plan.price}
                    </span>
                  </div>

                  <span
                    className={`text-xs ${
                      plan.isHighlight ? "text-blue-200" : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {plan.label}
                  </span>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h5
                    className={`text-xs font-medium mb-2 text-center ${
                      plan.isHighlight ? "text-blue-100" : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {t("pricing.featuresTitle")}
                  </h5>
                  <ul className="space-y-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs">
                        <Check
                          className={`w-3 h-3 mr-2 flex-shrink-0 ${
                            plan.isHighlight ? "text-blue-200" : "text-green-500"
                          }`}
                        />
                        <span
                          className={plan.isHighlight ? "text-blue-50" : "text-gray-600 dark:text-gray-400"}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    plan.isHighlight
                      ? "bg-white text-blue-600 hover:bg-gray-100"
                      : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  }`}
                >
                  {t("pricing.selectButton")} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center space-x-2 pb-4 pt-3">
        {pricingPlans.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-slate-600"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingCarousel;
