import { Schema, model, models } from "mongoose";
// models/Certificate.ts
const Lang = { title: { type: String, required: true }, description: String };

const CertificateSchema = new Schema({
  image_path: { type: String, required: true },     // public URL
  storage_path: { type: String },                    // "portfolio/certificates/xxxx.webp"
  sertificate_url: String,
  translations: { en: Lang, id: Lang },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default models.Certificate || model("Certificate", CertificateSchema);
