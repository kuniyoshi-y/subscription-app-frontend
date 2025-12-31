import "./globals.css";
import type { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">{children}</body>
    </html>
  );
};

export default RootLayout;
