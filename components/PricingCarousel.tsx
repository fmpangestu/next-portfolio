"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Zap } from "lucide-react";

const PricingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const myWhatsAppNumber = "6283199412171"; // <-- GANTI DENGAN NOMOR ANDA!

  const handleSelectPlan = (planName: string) => {
    const message = `Halo, saya tertarik dengan layanan "${planName}" yang saya lihat di portofolio Anda. Bisa tolong berikan info lebih lanjut?`;

    // encodeURIComponent memastikan karakter seperti spasi, dll., aman untuk URL
    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;

    // Membuka WhatsApp di tab baru
    window.open(whatsappURL, "_blank");
  };
  const pricingPlans = [
    {
      name: "Company Profile",
      description:
        "Solusi untuk profil perusahaan kamu agar terlihat lebih menarik",
      price: "3jt",
      label: "SPECIAL RATE",
      popular: false,
      features: [
        "Web Design Custom",
        "Domain Custom",
        "Storage 500MB SSD",
        "Unlimited Bandwidth",
        "SSL Certificate",
      ],
    },
    {
      name: "Online Store",
      description:
        "Mempermudah seller dan buyer untuk bertransaksi di toko kamu",
      price: "5jt",
      label: "SPECIAL RATE",
      popular: true,
      features: [
        "Dashboard Admin Page",
        "Web Design Custom",
        "Domain Custom",
        "Storage 1GB SSD",
        "Unlimited Bandwidth",
      ],
    },
    {
      name: "Custom Web Aplikasi",
      description: "Kita bisa membuat aplikasi yang kamu ingin kan",
      price: "15jt",
      label: "Up to",
      popular: false,
      isHighlight: true,
      features: [
        "Dashboard Admin Page",
        "Storage Based On Needs",
        "Feature Based On Needs",
        "Web Design Custom",
        "Domain Custom",
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % pricingPlans.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + pricingPlans.length) % pricingPlans.length
    );
  };

  if (!mounted) return null;

  const currentPlan = pricingPlans[currentIndex];

  return (
    <div className="md:hidden mx-2 rounded-md  z-40 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 shadow-2xl">
      {/* Header */}
      <div className="text-center py-4 px-4 border-b border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Harga Terjangkau
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Pilih paket yang sesuai dengan kebutuhan bisnis Anda
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl p-4 ${
              currentPlan.isHighlight
                ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
                : "bg-gray-50 dark:bg-slate-800"
            }`}
          >
            {/* Popular Badge */}
            {currentPlan.popular && (
              <div className="text-center mb-3">
                <span className="bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                  Popular
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-2">
                {currentPlan.isHighlight && <Zap className="w-4 h-4 mr-1" />}
                <h4
                  className={`text-lg font-bold ${
                    currentPlan.isHighlight
                      ? "text-white"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {currentPlan.name}
                </h4>
              </div>

              <p
                className={`text-xs mb-3 ${
                  currentPlan.isHighlight
                    ? "text-blue-100"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {currentPlan.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline justify-center mb-1">
                <span
                  className={`text-xs mr-1 ${
                    currentPlan.isHighlight
                      ? "text-blue-200"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  IDR
                </span>
                <span
                  className={`text-2xl font-bold ${
                    currentPlan.isHighlight
                      ? "text-white"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {currentPlan.price}
                </span>
              </div>

              <span
                className={`text-xs ${
                  currentPlan.isHighlight
                    ? "text-blue-200"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {currentPlan.label}
              </span>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h5
                className={`text-xs font-medium mb-2 text-center ${
                  currentPlan.isHighlight
                    ? "text-blue-100"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Yang Kamu Dapatkan:
              </h5>
              <ul className="space-y-1">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-xs">
                    <Check
                      className={`w-3 h-3 mr-2 flex-shrink-0 ${
                        currentPlan.isHighlight
                          ? "text-blue-200"
                          : "text-green-500"
                      }`}
                    />
                    <span
                      className={`${
                        currentPlan.isHighlight
                          ? "text-blue-50"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleSelectPlan(currentPlan.name)}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPlan.isHighlight
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              }`}
            >
              Pilih Layanan →
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-slate-700 shadow-lg hover:shadow-xl transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-slate-700 shadow-lg hover:shadow-xl transition-all"
        >
          <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 pb-4">
        {pricingPlans.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-blue-600 dark:bg-blue-400"
                : "bg-gray-300 dark:bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingCarousel;
