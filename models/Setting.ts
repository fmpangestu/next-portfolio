// models/Setting.ts
import { Schema, model, models } from "mongoose";

const SettingSchema = new Schema({
  _id: { type: String, default: "singleton" }, // selalu 1 dokumen
  profile: {
    displayName: String,
    username: String,
    headline: { en: String, id: String },
    location: String,
    email: String,
    resume_url: String,
    avatar_url: String,
    socials: {
      github: String, linkedin: String, instagram: String, whatsapp: String,
    }
  },
  i18n: { defaultLocale: String, locales: [String] },
  seo: { siteName: String, defaultTitle: String, defaultDescription: String, ogImage: String },
  featureFlags: { showPricing: Boolean, showCertificates: Boolean, showExperiences: Boolean },
  homeHeroRotatingTitles: { en: [String], id: [String] },
  contact: { whatsappNumber: String, emailReceiver: String },
  uploads: { bucket: String, basePublicUrl: String },
  maintenance: { enabled: Boolean, message: String },
}, { timestamps: true });

export default models.Setting || model("Setting", SettingSchema);
