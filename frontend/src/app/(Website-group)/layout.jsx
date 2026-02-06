import localFont from "next/font/local";
import "../../app/globals.css";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import { InquiryProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

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
      <body>
        <InquiryProvider>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </InquiryProvider>
      </body>
    </html>
  );
}
