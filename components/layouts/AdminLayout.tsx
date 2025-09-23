import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import {
  LayoutGrid,
  FileCode,
  Award,
  BriefcaseBusiness,
  Settings,
  LogOut,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", Icon: LayoutGrid },
  { href: "/admin/projects", label: "Projects", Icon: FileCode },
  { href: "/admin/certificates", label: "Certificates", Icon: Award },
  { href: "/admin/experiences", label: "Experiences", Icon: BriefcaseBusiness },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter();
  return (
    <div className=" bg-[#0b1524] text-white custom-scrollbar">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0e1a2b]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/admin" className="text-base font-semibold">
            <span className="opacity-80">Admin</span>
            <span className="text-sky-400"> • Portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
            >
              ↩ Back to Site
            </Link>
            <button className="inline-flex items-center gap-2 rounded-lg bg-red-600/90 px-3 py-1.5 text-xs font-medium hover:bg-red-600">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Shell */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="h-max rounded-2xl border border-white/10 bg-[#0e1a2b] p-3">
          <nav className="space-y-1">
            {nav.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-sm
                ${
                  pathname === href
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-4 rounded-xl border border-white/10 p-3 text-xs text-white/60">
            <p className="font-medium text-white/80">Tips</p>
            <p>Isi dua bahasa (EN & ID) agar tampil sesuai locale.</p>
          </div>

        </aside>

        {/* Content */}
        <main className="rounded-2xl border border-white/10 bg-[#0e1a2b] p-4 md:p-6 overflow-y-auto h-[calc(100vh-6rem)] custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
