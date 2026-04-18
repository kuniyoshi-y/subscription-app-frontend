import "./globals.css";
import AmplifyProvider from "./components/AmplifyProvider";
import AppShell from "./components/AppShell";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">
        <AmplifyProvider>
          <AppShell>{children}</AppShell>
        </AmplifyProvider>
      </body>
    </html>
  );
};

export default RootLayout;
