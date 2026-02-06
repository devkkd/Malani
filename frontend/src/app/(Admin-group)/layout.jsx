import localFont from "next/font/local";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";

const neiko = localFont({
  src: [
    {
      path: "../../fonts/Neiko-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/Neiko-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neiko",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={neiko.variable}>
      <body className="antialiased">
        <div className="flex h-screen overflow-hidden bg-[#FFFEF5]">
          <Sidebar />

          <div className="flex-1 flex flex-col min-h-screen relative">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#FFFEF5] p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
