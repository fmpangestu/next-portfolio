// models/Experience.ts
import { Schema, model, models, InferSchemaType } from "mongoose";

const Lang = { role: String, description: String };

export const ExperienceSchema = new Schema(
  {
    company: String,
    start: Date,
    end: { type: Date, default: null },
    tools: [String],
    translations: { en: Lang, id: Lang },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type ExperienceDoc = InferSchemaType<typeof ExperienceSchema>;

const Experience =
  models.Experience || model("Experience", ExperienceSchema);
export default Experience;
