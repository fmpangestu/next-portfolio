// pages/admin/index.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import Link from "next/link";
import { FileCode, Award, BriefcaseBusiness, Plus, ShieldCheck, AlertTriangle } from "lucide-react";

const fetcher = (u: string) => fetch(u).then(r => r.json());

const card = "rounded-2xl border border-white/10 bg-[#0e1a2b] p-4";
const stat = "rounded-xl border border-white/10 bg-white/5 p-4 flex items-center gap-3";
const chip = "px-2 py-0.5 text-[11px] rounded-md border border-white/10 bg-white/5 text-white/70";

export default function AdminHome() {
  const { data: summary } = useSWR("/api/admin/summary", fetcher);
  const { data: health }   = useSWR("/api/admin/health", fetcher);

  const counts = summary?.data?.counts || { projects: 0, certificates: 0, experiences: 0 };
  const recents = summary?.data?.recents || { projects: [], certificates: [], experiences: [] };
  const ok = health?.data;

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Admin</h1>
          <div className="flex gap-2">
            <Link href="/admin/projects" className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-1.5 lg:px-2 py-0.5 lg:py-1.5 text-xs lg:text-sm hover:bg-sky-500">
              <Plus className="h-4 w-4" /> New Project
            </Link>
            <Link href="/admin/certificates" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-1.5 lg:px-2 py-0.5 lg:py-1.5 text-xs lg:text-sm hover:bg-emerald-500">
              <Plus className="h-4 w-4" /> Add Certificate
            </Link>
            <Link href="/admin/experiences" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-1.5 lg:px-2 py-0.5 lg:py-1.5 text-xs lg:text-sm hover:bg-indigo-500">
              <Plus className="h-4 w-4" /> Add Experience
            </Link>
          </div>
        </div>

        {/* Stats */}
        <section className="grid gap-4 md:grid-cols-3">
          <Link href="/admin/projects" className={stat}>
            <FileCode className="h-5 w-5 text-sky-400" />
            <div>
              <p className="text-xs text-white/60">Projects</p>
              <p className="text-xl font-semibold">{counts.projects}</p>
            </div>
          </Link>
          <Link href="/admin/certificates" className={stat}>
            <Award className="h-5 w-5 text-emerald-400" />
            <div>
              <p className="text-xs text-white/60">Certificates</p>
              <p className="text-xl font-semibold">{counts.certificates}</p>
            </div>
          </Link>
          <Link href="/admin/experiences" className={stat}>
            <BriefcaseBusiness className="h-5 w-5 text-indigo-400" />
            <div>
              <p className="text-xs text-white/60">Experiences</p>
              <p className="text-xl font-semibold">{counts.experiences}</p>
            </div>
          </Link>
        </section>

        {/* Two columns: Recents + Health */}
        <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <div className={card}>
            <h2 className="mb-3 font-medium">Recent Activity</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <RecentList title="Projects" items={recents.projects} href="/admin/projects" color="text-sky-300" />
              <RecentList title="Certificates" items={recents.certificates} href="/admin/certificates" color="text-emerald-300" />
              <RecentList title="Experiences" items={recents.experiences} href="/admin/experiences" color="text-indigo-300" />
            </div>
          </div>

          <div className={card}>
            <h2 className="mb-3 font-medium">System Status</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span>MongoDB</span>
                <Status ok={ok?.mongo} />
              </li>
              <li className="flex items-center justify-between">
                <span>Supabase (Storage)</span>
                <Status ok={ok?.supabase} />
              </li>
              <li className="flex items-center justify-between">
                <span>ENV • ADMIN_TOKEN</span>
                <span className={chip}>{ok?.env?.NEXT_PUBLIC_ADMIN_TOKEN ? "set" : "missing"}</span>
              </li>
            </ul>

            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/70">
              {ok?.mongo && ok?.supabase ? (
                <p className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> All good.</p>
              ) : (
                <p className="inline-flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-yellow-400" /> Check your connection or env.</p>
              )}
            </div>
          </div>
        </section>
      </div>
  );
}

function RecentList({ title, items, href, color }:{
  title: string; items: any[]; href: string; color?: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <Link href={href} className="text-xs text-white/60 hover:text-white">View all</Link>
      </div>
      <ul className="space-y-2">
        {items?.length ? items.map((it:any)=>(
          <li key={it.id} className="text-xs text-white/80">
            <span className={`${color} mr-2`}>•</span>{it.title}
          </li>
        )) : <li className="text-xs text-white/50">No data yet</li>}
      </ul>
    </div>
  );
}

function Status({ ok }: { ok?: boolean }) {
  return (
    <span className={`px-2 py-0.5 text-[11px] rounded-md border ${ok ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-rose-500/30 bg-rose-500/10 text-rose-300"}`}>
      {ok ? "online" : "down"}
    </span>
  );
}
