// models/Project.ts
import { Schema, model, models } from "mongoose";

const Lang = { title: { type: String, required: true }, description: String };

const ProjectSchema = new Schema(
  {
    username: String,
    slug: { type: String, unique: true, index: true, sparse: true },
    image_path: String,       // public URL
    storage_path: String,     // "portfolio/projects/xxxx.jpg" (untuk delete)
    deployed_url: String,
    github_url: { type: String, required: true },
    category: [String],
    key_techs: [String],
    references: String,
    translations: { en: Lang, id: Lang },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);
