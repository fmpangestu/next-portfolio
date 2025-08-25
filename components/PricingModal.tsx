import { X, Check, Zap } from "lucide-react";
import { FunctionComponent } from "react";
import { useTranslation } from "next-i18next"; // Import hook useTranslation

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal: FunctionComponent<PricingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation("common"); // Gunakan hook useTranslation

  if (!isOpen) return null;
  const myWhatsAppNumber = "6283199412171"; // <-- GANTI DENGAN NOMOR ANDA!

  const handleSelectPlan = (planName: string) => {
    // Gunakan terjemahan untuk pesan WhatsApp sesuai bahasa aktif
    const message = t("pricing.whatsappMessage", { planName });
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const pricingPlans = [
    {
      name: t("pricing.plans.companyProfile.name"),
      description: t("pricing.plans.companyProfile.description"),
      price: "3jt",
      label: t("pricing.specialRate"),
      popular: false,
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
      popular: false,
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-100 dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-scroll relative custom-scrollbar2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center py-8 px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("pricing.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 px-6 pb-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 transition-all duration-500 ease-in-out transform  hover:-translate-y-4 hover:shadow-2xl ${
                plan.isHighlight
                  ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg"
                  : "bg-gray-50  dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 shadow-2xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium">
                    {t("pricing.popular")}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  {plan.isHighlight && <Zap className="w-5 h-5 mr-2" />}
                  <h3
                    className={`text-xl font-bold ${
                      plan.isHighlight
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>
                <p
                  className={`text-sm mb-4 ${
                    plan.isHighlight
                      ? "text-blue-100"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline mb-2">
                  <span
                    className={`text-sm font-medium mr-1 ${
                      plan.isHighlight
                        ? "text-blue-200"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {t("pricing.currency")}
                  </span>
                  <span
                    className={`text-4xl font-bold ${
                      plan.isHighlight
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    plan.isHighlight
                      ? "text-blue-200"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {plan.label}
                </span>
              </div>

              {/* Features */}
              <div className="mb-7">
                <h4
                  className={`font-medium mb-4 ${
                    plan.isHighlight
                      ? "text-blue-100"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {t("pricing.featuresTitle")}
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check
                        className={`w-4 h-4 mr-3 flex-shrink-0 ${
                          plan.isHighlight ? "text-blue-200" : "text-green-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.isHighlight
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
                onClick={() => handleSelectPlan(plan.name)}
                className={`w-1/2 right-4 mb-3 bottom-0 absolute py-0.5 px-6 rounded-lg font-medium transition-all duration-300 ${
                  plan.isHighlight
                    ? "bg-white text-blue-600 hover:bg-gray-100"
                    : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                }`}
              >
                {t("pricing.selectButton")} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
