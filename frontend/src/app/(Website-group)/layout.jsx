import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import { InquiryProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export default function WebsiteLayout({ children }) {
  return (
    <InquiryProvider>
      <Header />
      {children}
      <Footer />
      <Toaster position="top-right" />
    </InquiryProvider>
  );
}
