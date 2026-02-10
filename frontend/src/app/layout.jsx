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

export const metadata = {
  title: "Malani Impex - Premium Textile Manufacturer",
  description: "Leading manufacturer and exporter of premium textiles, rugs, and home furnishings. Discover our handcrafted collections.",
  icons: {
    icon: [
      // Light theme favicon (default)
      { 
        url: '/images/favicon.png', 
        type: 'image/png',
        media: '(prefers-color-scheme: light)'
      },
      // Dark theme favicon (white version)
      { 
        url: '/images/white-favicon.png', 
        type: 'image/png',
        media: '(prefers-color-scheme: dark)'
      },
      // Fallback
      { url: '/images/favicon.png', type: 'image/png' },
    ],
    apple: '/images/logo/logo.png',
    shortcut: '/images/favicon.png',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFEF5' },
    { media: '(prefers-color-scheme: dark)', color: '#666141' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={neiko.variable}>
      <body>{children}</body>
    </html>
  );
}
