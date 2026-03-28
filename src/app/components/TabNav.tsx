"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TabNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    isActive(href)
      ? "rounded-lg px-3 py-1.5 text-sm font-semibold bg-violet-50 text-violet-700 transition-colors"
      : "rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors";

  return (
    <nav className="flex items-center gap-1">
      <Link href="/" className={linkClass("/")}>
        ダッシュボード
      </Link>
      <Link href="/expenses" className={linkClass("/expenses")}>
        一覧
      </Link>
      <Link href="/dashboard/charts" className={linkClass("/dashboard")}>
        分析
      </Link>
    </nav>
  );
};

export default TabNav;
