"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ダッシュボード" },
  { href: "/expenses", label: "支出一覧" },
  { href: "/dashboard/charts", label: "分析" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-56 flex-col bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500 border-2 border-slate-900 text-xs font-black text-white shadow-[2px_2px_0px_#94a3b8]">
            S
          </span>
          <div>
            <p className="text-sm font-black text-slate-900 leading-tight tracking-tight">サブスク管理</p>
          </div>
        </div>
      </div>

      <div className="mx-5 h-px bg-slate-100" />

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-2">
        <p className="pb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">
          Menu
        </p>
        {navItems.map(({ href, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-150 ${
                active
                  ? "bg-violet-500 text-white border-2 border-slate-900 shadow-[2px_2px_0px_#94a3b8]"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-5 h-px bg-slate-100" />

      <div className="px-5 py-4">
        <p className="text-[10px] font-medium text-slate-300">v0.1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
