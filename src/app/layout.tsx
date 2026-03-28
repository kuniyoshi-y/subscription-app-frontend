import "./globals.css";
import Sidebar from "./components/Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">
        <Sidebar />
        <div className="ml-56 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
