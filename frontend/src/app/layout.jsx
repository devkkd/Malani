import localFont from "next/font/local";
import "./globals.css";

const neiko = localFont({
  src: [
    {
      path: "../fonts/Neiko-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Neiko-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neiko",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={neiko.variable}>
      <body>{children}</body>
    </html>
  );
}
