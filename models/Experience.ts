import { Schema, model, models } from "mongoose";
const lang = { role: String, description: String };

const ExperienceSchema = new Schema({
  company: String,
  start: Date,
  end: { type: Date, default: null },
  tools: [String],
  translations: { en: lang, id: lang },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default models.Experience || model("Experience", ExperienceSchema);
