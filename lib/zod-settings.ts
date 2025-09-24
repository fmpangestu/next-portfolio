// lib/zod-settings.ts
import { z } from "zod";

/* Helpers */
const trim = z.string().transform((s) => s.trim());
const trimMin1 = z.string().min(1).transform((s) => s.trim());

// "" -> undefined
const toUndefIfEmpty = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

// optional email/url yang mengizinkan "" dan akan di-trim
const optionalEmail = z.preprocess(
  toUndefIfEmpty,
  z.string().email().transform((s) => s.trim()).optional()
);

const optionalUrl = z.preprocess(
  toUndefIfEmpty,
  z.string().url().transform((s) => s.trim()).optional()
);

export const SettingsSchema = z.object({
  profile: z.object({
    displayName: trimMin1,
    username: trim.optional(),
    headline: z.object({
      en: trim.optional(),
      id: trim.optional(),
    }),
    location: trim.optional(),
    email: optionalEmail,
    resume_url: optionalUrl,
    avatar_url: optionalUrl,
    socials: z.object({
      github: optionalUrl,
      linkedin: optionalUrl,
      instagram: optionalUrl,
      // boleh nomor biasa (biar fleksibel, kosong juga ok)
      whatsapp: trim.optional(),
    }),
  }),

  i18n: z.object({
    defaultLocale: z.enum(["id", "en"]).default("id"),
    locales: z.array(z.enum(["id", "en"])).default(["id", "en"]),
  }),

  seo: z.object({
    siteName: trim.default("Portfolio"),
    defaultTitle: trim.default("Portfolio"),
    defaultDescription: trim.default(""),
    ogImage: optionalUrl,
  }),

  featureFlags: z.object({
    showPricing: z.boolean().default(true),
    showCertificates: z.boolean().default(true),
    showExperiences: z.boolean().default(true),
  }),

  homeHeroRotatingTitles: z.object({
    en: z.array(trim).default([]),
    id: z.array(trim).default([]),
  }),

  contact: z.object({
    whatsappNumber: trim.optional(),
    emailReceiver: optionalEmail,
  }),

  uploads: z.object({
    bucket: trim.default("portfolio"),
    // informatif; boleh kosong
    basePublicUrl: trim.optional(),
  }),

  maintenance: z.object({
    enabled: z.boolean().default(false),
    message: trim.optional(),
  }).default({ enabled: false }),
});

export type SettingsInput = z.infer<typeof SettingsSchema>;
