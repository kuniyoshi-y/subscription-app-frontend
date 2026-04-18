"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/expenses", label: "支出" },
  { href: "/dashboard/charts", label: "分析" },
];

const BottomNav = () => {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex md:hidden border-t-2 border-slate-900 bg-white">
      {navItems.map(({ href, label }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center py-3 text-xs font-bold transition-colors ${
              active
                ? "bg-violet-500 text-white"
                : "text-slate-400 hover:text-slate-900"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
