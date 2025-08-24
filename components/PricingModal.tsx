import { X, Check, Zap } from "lucide-react";
import { FunctionComponent } from "react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal: FunctionComponent<PricingModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;
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
        "Free Maintenance System",
        "Backup Data",
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
        "SSL Certificate",
        "Free Maintenance System",
        "Backup Data",
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
        "Unlimited Bandwidth",
        "SSL Certificate",
        "Free Maintenance System",
        "Backup Data",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4  ">
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
            Harga Terjangkau
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
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
                    Popular
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
                    IDR
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
                  Yang Kamu Dapatkan:
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
                Pilih Layanan →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
