"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

const AUTH_PATHS = ["/login", "/signup"];

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <BottomNav />
      <div className="md:ml-56 min-h-screen pb-20 md:pb-0">{children}</div>
    </>
  );
};

export default AppShell;
