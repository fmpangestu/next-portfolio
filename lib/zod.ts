// lib/zod.ts
import { z } from "zod";

/** Helpers untuk normalisasi input */
const toUndefinedIfEmpty = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const toNullIfEmpty = (v: unknown) =>
  v === "" || v === undefined ? null : v;

const trim = z.string().transform((s) => s.trim());

/** URL yang ditrim dan divalidasi formatnya */
const url = z.string().url({ message: "URL tidak valid" }).transform((s) => s.trim());

/** Enum kategori */
export const CategoryEnum = z.enum([
  "react",
  "node",
  "laravel",
  "nextJs",
  "express",
  "php",
  "mysql",
  "mongodb",
  "typescript",
  "html",
  "javascript",
  "tailwind",
  "postgresql",
  "css",
  "python",
  "flask",
  "django",
  "docker",
  "aws",
  "git",
]);

/** ----- PROJECT ----- */
export const ProjectCreateSchema = z.object({
  username: trim.optional(),
  // slug optional (server yang boleh generate); kalau ada → minimal 3 dan lowercased
  slug: z.string().min(3, "Slug minimal 3 karakter").transform((s) => s.trim().toLowerCase()).optional(),

  // path publik dari Supabase (boleh kosong sebelum upload)
  image_path: trim.optional(),
  // path internal untuk delete di Supabase (optional)
  storage_path: trim.optional(),

  deployed_url: url.optional(),
  github_url: url, // wajib

  category: z.array(CategoryEnum).min(1, "Pilih minimal 1 kategori"),

  // Bisa array atau "comma separated"
  key_techs: z
    .union([z.array(trim), trim])
    .transform((v) =>
      Array.isArray(v)
        ? v.map((s) => s.trim()).filter(Boolean)
        : v.split(",").map((s) => s.trim()).filter(Boolean)
    )
    .default([]),

  references: trim.optional(),

  translations: z.object({
    en: z.object({
      title: z.string().min(1, "Title EN wajib").transform((s) => s.trim()),
      description: trim.optional(),
    }),
    id: z.object({
      title: z.string().min(1, "Judul ID wajib").transform((s) => s.trim()),
      description: trim.optional(),
    }),
  }),

  published: z.boolean().optional().default(true),
});
export type ProjectCreateInput = z.infer<typeof ProjectCreateSchema>;

/** ----- CERTIFICATE ----- */
export const CertificateCreateSchema = z.object({
  image_path: trim.optional(),   // public URL Supabase
  storage_path: trim.optional(), // internal storage path (untuk delete)
  sertificate_url: url.optional(),
  translations: z.object({
    en: z.object({ title: trim, description: trim.optional() }),
    id: z.object({ title: trim, description: trim.optional() }),
  }),
  published: z.boolean().optional().default(true),
});
export type CertificateCreateInput = z.infer<typeof CertificateCreateSchema>;

/** ----- EXPERIENCE ----- */
/** start wajib isi; end boleh kosong (null); tools bisa "comma separated" */
export const ExperienceCreateSchema = z.object({
  company: z.string().min(1, "Company wajib").transform((s) => s.trim()),

  // "" -> undefined lalu z.coerce.date akan mengeluh "Invalid date"
  // (biar errornya jelas kalau start kosong)
  start: z.preprocess(toUndefinedIfEmpty, z.coerce.date()),

  // "" -> null (valid untuk nullable), selain itu dipaksa Date
  end: z
    .preprocess(toNullIfEmpty, z.coerce.date())
    .nullable()
    .optional(),

  tools: z
    .union([z.array(trim), trim])
    .transform((v) =>
      Array.isArray(v)
        ? v.map((s) => s.trim()).filter(Boolean)
        : v.split(",").map((s) => s.trim()).filter(Boolean)
    ),

  translations: z.object({
    en: z.object({
      role: trim.optional(),
      description: trim.optional(),
    }),
    id: z.object({
      role: trim.optional(),
      description: trim.optional(),
    }),
  }),

  published: z.boolean().optional().default(true),
});
export type ExperienceCreateInput = z.infer<typeof ExperienceCreateSchema>;
