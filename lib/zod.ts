import { z } from "zod";

export const CategoryEnum = z.enum([
  "react","node","laravel","nextJs","express","php","mysql","mongodb",
  "typescript","html","javascript","tailwind","postgresql","css",
  "python","flask","django","docker","aws","git"
]);

export const ProjectCreateSchema = z.object({
  username: z.string().optional(),
  // bikin optional—server yang generate
  slug: z.string().min(3).optional(),
  image_path: z.string().optional(),
  deployed_url: z.string().url().optional(),
  github_url: z.string().url(),
  category: z.array(CategoryEnum).min(1, "Pilih minimal 1 kategori"),
  key_techs: z.array(z.string()).default([]),
  references: z.string().optional(),
  translations: z.object({
    en: z.object({ title: z.string().min(1, "Title EN wajib"), description: z.string().optional() }),
    id: z.object({ title: z.string().min(1, "Judul ID wajib"), description: z.string().optional() }),
  }),
  published: z.boolean().optional(),
});


export const CertificateCreateSchema = z.object({
  image_path: z.string().optional(),
  sertificate_url: z.string().url().optional(),
  translations: z.object({
    en: z.object({ title: z.string(), description: z.string().optional() }),
    id: z.object({ title: z.string(), description: z.string().optional() }),
  }),
  published: z.boolean().optional(),
});

export const ExperienceCreateSchema = z.object({
  company: z.string(),
  start: z.preprocess((v) => new Date(String(v)), z.date()),
  end: z.preprocess((v) => (v ? new Date(String(v)) : null), z.date().nullable()),
  tools: z.array(z.string()).default([]),
  translations: z.object({
    en: z.object({ role: z.string(), description: z.string().optional() }),
    id: z.object({ role: z.string(), description: z.string().optional() }),
  }),
  published: z.boolean().optional(),
});