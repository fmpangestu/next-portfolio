/* eslint-disable @typescript-eslint/no-unused-vars */

import { SettingsSchema } from "@/lib/zod-settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import useSWR from "swr";
import { useEffect } from "react";
import type { z } from "zod";

const fetcher = (u: string) => fetch(u).then(r => r.json());

// ===> derive langsung dari schema
type FormValues = z.infer<typeof SettingsSchema>;

const input = "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500";
const label = "text-xs font-medium text-white/70";
const card  = "rounded-xl border border-white/10 bg-white/5 p-4";
const btn   = "rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500";

export default function AdminSettingsPage() {
  const { data, isLoading } = useSWR("/api/settings", fetcher);

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    // ===> ketik resolver tanpa generik, biar inference otomatis
    resolver: zodResolver(SettingsSchema),
    // defaultValues boleh partial supaya gak bertabrakan dengan optional (string | undefined)
    defaultValues: {
      profile: {
        displayName: "",
        username: "",
        headline: { en: "", id: "" },
        location: "",
        email: "",
        resume_url: "",
        avatar_url: "",
        socials: { github: "", linkedin: "", instagram: "", whatsapp: "" },
      },
      i18n: { defaultLocale: "id", locales: ["id","en"] },
      seo: { siteName: "Portfolio", defaultTitle: "Portfolio", defaultDescription: "", ogImage: "" },
      featureFlags: { showPricing: true, showCertificates: true, showExperiences: true },
      homeHeroRotatingTitles: { en: [], id: [] },
      contact: { whatsappNumber: "", emailReceiver: "" },
      uploads: { bucket: "portfolio", basePublicUrl: "" },
      maintenance: { enabled: false, message: "" },
    },
  });

  useEffect(() => {
    if (data?.data) reset(data.data as FormValues);
  }, [data?.data, reset]);

  // ===> ketik onSubmit dengan SubmitHandler<FormValues>
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
      },
      body: JSON.stringify(values),
    });

    const ct = res.headers.get("content-type") || "";
    const body = ct.includes("application/json") ? await res.json() : { error: await res.text() };

    if (res.ok) {
      alert("Saved");
    } else {
      console.log("Save settings error:", body);
      alert(typeof body.error === "string" ? body.error : "Failed");
    }
  };

  if (isLoading && !data) {
    return <div className="p-6">Loading…</div>;
  }

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-xl font-semibold">Admin • Settings</h1>

        {/* PROFILE */}
        <section className={card}>
          <h3 className="mb-3 font-medium">Profile</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <div><p className={label}>Display Name</p><input className={input} {...register("profile.displayName")} /></div>
            <div><p className={label}>Username</p><input className={input} {...register("profile.username")} /></div>
            <div><p className={label}>Location</p><input className={input} {...register("profile.location")} /></div>
            <div><p className={label}>Email</p><input className={input} {...register("profile.email")} /></div>
            <div><p className={label}>Resume URL</p><input className={input} {...register("profile.resume_url")} /></div>
            <div><p className={label}>Avatar URL</p><input className={input} {...register("profile.avatar_url")} /></div>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div><p className={label}>Headline (EN)</p><input className={input} {...register("profile.headline.en")} /></div>
            <div><p className={label}>Headline (ID)</p><input className={input} {...register("profile.headline.id")} /></div>
          </div>
        </section>

        {/* SOCIALS */}
        <section className={card}>
          <h3 className="mb-3 font-medium">Socials</h3>
          <div className="grid gap-3 md:grid-cols-4">
            <div><p className={label}>GitHub</p><input className={input} {...register("profile.socials.github")} /></div>
            <div><p className={label}>LinkedIn</p><input className={input} {...register("profile.socials.linkedin")} /></div>
            <div><p className={label}>Instagram</p><input className={input} {...register("profile.socials.instagram")} /></div>
            <div><p className={label}>WhatsApp (number)</p><input className={input} {...register("profile.socials.whatsapp")} /></div>
          </div>
        </section>

        {/* SEO */}
        <section className={card}>
          <h3 className="mb-3 font-medium">SEO Defaults</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <div><p className={label}>Site Name</p><input className={input} {...register("seo.siteName")} /></div>
            <div><p className={label}>Default Title</p><input className={input} {...register("seo.defaultTitle")} /></div>
            <div><p className={label}>OG Image URL</p><input className={input} {...register("seo.ogImage")} /></div>
          </div>
          <div className="mt-3">
            <p className={label}>Default Description</p>
            <textarea rows={3} className={input} {...register("seo.defaultDescription")} />
          </div>
        </section>

        {/* FLAGS */}
        <section className={card}>
          <h3 className="mb-3 font-medium">Feature Flags</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("featureFlags.showPricing")} />
              Show Pricing
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("featureFlags.showCertificates")} />
              Show Certificates
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("featureFlags.showExperiences")} />
              Show Experiences
            </label>
          </div>
        </section>

        {/* MAINTENANCE */}
        <section className={card}>
          <h3 className="mb-3 font-medium">Maintenance</h3>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("maintenance.enabled")} />
            Enable Maintenance Mode
          </label>
          <div className="mt-3">
            <p className={label}>Message</p>
            <input className={input} {...register("maintenance.message")} />
          </div>
        </section>

        <div className="flex justify-center">
          <button className={btn} type="submit">Save</button>
        </div>
      </form>
  );
}
