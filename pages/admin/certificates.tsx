/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CertificateCreateSchema } from "@/lib/zod";
import useSWR from "swr";
import { useRouter } from "next/router";
import FileUpload from "@/components/admin/FileUpload";
import Image from "next/image";
import { Trash2 } from "lucide-react";

const fetcher = (u: string) => fetch(u).then((r) => r.json());
const input =
  "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500";
const label = "text-xs font-medium text-white/70";
const card = "rounded-xl border border-white/10 bg-white/5 p-4";
const btn =
  "rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500";

export default function AdminCertificates() {
  const { locale } = useRouter();
  const lang = (locale as "id" | "en") || "id";
  const { data, mutate } = useSWR(`/api/certificates?lang=${lang}`, fetcher);

  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(CertificateCreateSchema),
    defaultValues: {
      image_path: "",
      sertificate_url: "",
      translations: {
        en: { title: "", description: "" },
        id: { title: "", description: "" },
      },
      published: true,
    } as any,
  });

  const onSubmit = async (values: any) => {
    const res = await fetch("/api/certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
      },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      reset();
      mutate();
      alert("Created");
    } else {
      alert("Failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure want to delete this item?")) return;
    const res = await fetch(`/api/certificates/${id}`, {
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
      console.error("DELETE /api/certificates failed:", json);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Admin • Certificates</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <section className={card}>
          <h3 className="mb-3 font-medium">Image</h3>
          <FileUpload
            onUploaded={(p) => setValue("image_path", p, { shouldDirty: true })}
          />
          <input type="hidden" {...register("image_path")} />
        </section>

        <section className={card}>
          <h3 className="mb-3 font-medium">Link</h3>
          <p className={label}>Certificate URL (optional)</p>
          <input
            className={input}
            placeholder="https://..."
            {...register("sertificate_url")}
          />
        </section>

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

        <div className="flex justify-center">
          <button className={btn}>Simpan</button>
        </div>
      </form>

      <section className="space-y-2">
        <h2 className="text-lg font-medium">Data</h2>
        <ul className="grid gap-2">
          {data?.data?.map((c: any) => (
            <li
              key={c.id}
              className={`${card} flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                {c.image_path && (
                  <Image
                    src={c.image_path}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded object-cover"
                    alt=""
                  />
                )}
                <div>
                  <p className="font-medium">{c.title}</p>
                  {c.sertificate_url && (
                    <a
                      className="text-xs underline"
                      href={c.sertificate_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit
                    </a>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex justify-center gap-2 px-2 py-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
