"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const cx = (...xs: Array<string | false | null | undefined>) =>
  xs.filter(Boolean).join(" ");

const TabNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const itemClass = (active: boolean) =>
    cx(
      "rounded-lg px-3 py-2 text-sm font-medium transition",
      active ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
    );

  return (
    <nav className="flex gap-2">
      <Link href="/" className={itemClass(isActive("/"))}>
        ダッシュボード
      </Link>
      <Link href="/expenses" className={itemClass(isActive("/expenses"))}>
        一覧
      </Link>
      <Link href="/dashboard/charts" className={itemClass(isActive("/dashboard"))}>
        分析
      </Link>
    </nav>
  );
};

export default TabNav;
