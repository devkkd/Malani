import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import { InquiryProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export default function WebsiteLayout({ children }) {
  return (
    <InquiryProvider>
      <Header />
      <main className="pt-[80px]">
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </InquiryProvider>
  );
}
