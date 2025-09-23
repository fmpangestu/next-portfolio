import { Schema, model, models } from "mongoose";

const lang = { title: { type: String, required: true }, description: String };

const ProjectSchema = new Schema({
  username: String,
  slug: { type: String, unique: true, index: true, sparse: true }, // sparse biar null boleh
  image_path: String,
  deployed_url: String,
  github_url: { type: String, required: true },
  category: [{ type: String, enum: [
    "react","node","laravel","nextJs","express","php","mysql","mongodb",
    "typescript","html","javascript","tailwind","postgresql","css",
    "python","flask","django","docker","aws","git"
  ]}],
  key_techs: [String],
  references: String,
  translations: { en: lang, id: lang },
  published: { type: Boolean, default: true },
}, { timestamps: true });

export default models.Project || model("Project", ProjectSchema);
