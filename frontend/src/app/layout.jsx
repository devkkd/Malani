import localFont from "next/font/local";
import Script from "next/script";
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
  title: "Textile Manufacturer in India | Handcrafted Textiles | Malani Impex",
  description: "Leading textile manufacturer and exporter in India. Handcrafted home textiles, block print and wholesale cushion covers for retailers worldwide since 1981.",
  verification: {
    google: "NotuF9LW2OkufpgYMb2grHOFOgWYFJe3TfEhj_VltRQ",
  },
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
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9P4W6D6MG0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9P4W6D6MG0');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
