import { Schema, model, models } from "mongoose";
const lang = { title: String, description: String };

const CertificateSchema = new Schema({
  image_path: String,
  sertificate_url: String,
  translations: { en: lang, id: lang },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default models.Certificate || model("Certificate", CertificateSchema);
