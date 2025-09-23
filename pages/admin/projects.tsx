/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectCreateSchema } from "@/lib/zod";
import useSWR from "swr";
import { useRouter } from "next/router";
import FileUpload from "@/components/admin/FileUpload";
import Image from "next/image";
import { useState } from "react";
import { Trash } from "lucide-react";

const fetcher = (u: string) => fetch(u).then((r) => r.json());
const input =
  "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500";
const label = "text-xs font-medium text-white/70";
const card = "rounded-xl border border-white/10 bg-white/5 p-4";

const CATEGORIES = [
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
] as const;

export default function AdminProjects() {
  const { locale } = useRouter();
  const lang = (locale as "id" | "en") || "id";
  const { data, mutate } = useSWR(`/api/projects?lang=${lang}`, fetcher);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset, control, setValue } = useForm({
    resolver: zodResolver(ProjectCreateSchema),
    defaultValues: {
      slug: "",
      github_url: "",
      deployed_url: "",
      image_path: "",
      category: [] as string[],
      key_techs: [] as string[],
      translations: {
        en: { title: "", description: "" },
        id: { title: "", description: "" },
      },
      published: true,
    } as any,
  });

  const onSubmit = async (values: any) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
      },
      body: JSON.stringify(values),
    });

    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      reset();
      mutate();
      alert("Created");
    } else {
      // tampilkan error dari server
      const msg = json?.error?.fieldErrors
        ? JSON.stringify(json.error.fieldErrors, null, 2)
        : json?.error || "Failed";
      alert(msg);
      console.error("POST /api/projects failed:", json);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure want to delete this item?")) return;
    const res = await fetch(`/api/projects/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
      },
    });
    if (res.ok) {
      mutate();
      alert("Deleted");
    } else {
      const json = await res.json().catch(() => ({}));
      const msg = json?.error || "Failed";
      alert(msg);
      console.error("DELETE /api/projects failed:", json);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Admin • Projects</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {/* Media & Links */}
        <section className={card}>
          <h3 className="mb-3 font-medium">Media & Links</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <FileUpload
                onUploaded={(p) =>
                  setValue("image_path", p, { shouldDirty: true })
                }
                onUploadingChange={setUploading}
              />
              <input type="hidden" {...register("image_path")} />
              <button type="submit" disabled={uploading}>
                {uploading ? "Tunggu upload..." : "Simpan"}
              </button>
            </div>
            <div className="grid gap-3">
              <div>
                <p className={label}>Slug</p>
                <input
                  className={input}
                  placeholder="my-awesome-project"
                  {...register("slug")}
                />
              </div>
              <div>
                <p className={label}>GitHub URL</p>
                <input
                  className={input}
                  placeholder="https://github.com/..."
                  {...register("github_url")}
                />
              </div>
              <div>
                <p className={label}>Live URL (optional)</p>
                <input
                  className={input}
                  placeholder="https://..."
                  {...register("deployed_url")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* EN */}
        <section className={card}>
          <h3 className="mb-3 font-medium">Content (EN)</h3>
          <input
            className={input}
            placeholder="Title (EN)"
            {...register("translations.en.title")}
          />
          <textarea
            className={input}
            rows={3}
            placeholder="Description (EN)"
            {...register("translations.en.description")}
          />
        </section>

        {/* ID */}
        <section className={card}>
          <h3 className="mb-3 font-medium">Konten (ID)</h3>
          <input
            className={input}
            placeholder="Judul (ID)"
            {...register("translations.id.title")}
          />
          <textarea
            className={input}
            rows={3}
            placeholder="Deskripsi (ID)"
            {...register("translations.id.description")}
          />
        </section>

        {/* Category & Techs */}
        <section className={card}>
          <h3 className="mb-3 font-medium">Kategori & Techs</h3>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <label
                    key={c}
                    className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={field.value.includes(c)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...field.value, c]
                          : field.value.filter((x: string) => x !== c);
                        field.onChange(next);
                      }}
                    />
                    {c}
                  </label>
                ))}
              </div>
            )}
          />
          <Controller
            control={control}
            name="key_techs"
            render={({ field }) => (
              <div className="mt-3">
                <p className={label}>Key Techs (comma separated)</p>
                <input
                  className={input}
                  placeholder="ReactJS, TailwindCSS"
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                />
              </div>
            )}
          />
        </section>

        <div className="flex justify-center">
          <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500 w-full">
            Simpan
          </button>
        </div>
      </form>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Data</h2>
        <ul className="grid gap-2">
          {data?.data?.map((p: any) => (
            <li key={p.id} className={`${card} flex items-center justify-between`}>
              <div className="flex items-center gap-3 ">
                {p.image_path && (
                  <Image
                    src={p.image_path}
                    className="h-10 w-10 rounded object-cover"
                    width={40}
                    height={40}
                    alt=""
                  />
                )}
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-white/60">{p.github_url}</p>
                </div>
              </div>
                <div>
                  <button onClick={() => handleDelete(p.slug)} className="flex justify-center gap-2 px-2 py-2"><Trash className="h-4 w-4"/></button>
                </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
