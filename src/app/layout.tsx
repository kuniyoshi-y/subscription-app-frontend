import "./globals.css";
import TabNav from "./components/TabNav";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="mx-auto max-w-5xl">
          <header className="p-4">
            <TabNav />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
