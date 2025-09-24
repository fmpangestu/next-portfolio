/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperienceCreateSchema } from "@/lib/zod";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Trash2 } from "lucide-react";

const fetcher = (u: string) => fetch(u).then((r) => r.json());
const input =
  "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500";
const label = "text-xs font-medium text-white/70";
const card = "rounded-xl border border-white/10 bg-white/5 p-4";
const btn =
  "rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium hover:bg-sky-500";

export default function AdminExperiences() {
  const { locale } = useRouter();
  const lang = (locale as "id" | "en") || "id";
  const { data, mutate } = useSWR(`/api/experiences?lang=${lang}`, fetcher);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    resolver: zodResolver(ExperienceCreateSchema),
    defaultValues: {
      company: "",
      start: "",
      end: "",
      tools: [] as string[],
      translations: {
        en: { role: "", description: "" },
        id: { role: "", description: "" },
      },
      published: true,
    } as any,
  });

  const onSubmit = async (values: any) => {
    // pastikan end kosong => null, biar tidak kirim ""
    if (!values.end) values.end = null;

    const res = await fetch("/api/experiences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`,
      },
      body: JSON.stringify(values),
    });

    // tampilkan pesan error dari server biar nggak "Failed" doang
    const ct = res.headers.get("content-type") || "";
    const body = ct.includes("application/json")
      ? await res.json()
      : { error: await res.text() };

    if (res.ok) {
      reset();
      mutate();
      alert("Created");
    } else {
      // kalau zod error, body.error akan punya detail
      console.log("Create experience error:", body);
      alert(typeof body.error === "string" ? body.error : "Bad Request");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure want to delete this item?")) return;
    const res = await fetch(`/api/experiences/${id}`, {
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
      console.error("DELETE /api/experiences failed:", json);
    }
  };

  const toolsStr = (watch("tools") || []).join(", ");

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Admin • Experiences</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <section className={card}>
          <h3 className="mb-3 font-medium">Info</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <p className={label}>Company</p>
              <input className={input} {...register("company")} />
            </div>
            <div>
              <p className={label}>Start</p>
              <input type="date" className={input} {...register("start")} />
            </div>
            <div>
              <p className={label}>End (optional)</p>
              <input type="date" className={input} {...register("end")} />
            </div>
          </div>
          <div className="mt-3">
            <p className={label}>Tools (comma separated)</p>
            <input
              className={input}
              value={toolsStr}
              placeholder="React, Node, MongoDB"
              onChange={(e) =>
                setValue(
                  "tools",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                  { shouldDirty: true }
                )
              }
            />
          </div>
        </section>

        <section className={card}>
          <h3 className="mb-3 font-medium">Content (EN)</h3>
          <input
            className={input}
            placeholder="Role (EN)"
            {...register("translations.en.role")}
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
            placeholder="Peran (ID)"
            {...register("translations.id.role")}
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
          {data?.data?.map((e: any) => (
            <li key={e.id} className={`${card} flex items-center justify-between`}>
              <div>
                <p className="font-medium">
                  {e.company} — {e.role}
                </p>
                <p className="text-xs text-white/60">
                  {new Date(e.start).toLocaleDateString()}{" "}
                  {e.end
                    ? `– ${new Date(e.end).toLocaleDateString()}`
                    : "– Present"}{" "}
                  • {e.tools?.join(", ")}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(e.id)}
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
