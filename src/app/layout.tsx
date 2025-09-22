"use client"
import { MainProvider } from "@/context/provider";
import { ThemeProvider } from "@/context/ThemeContext";
import "simplebar-react/dist/simplebar.min.css";
import "swiper/swiper-bundle.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0566EA" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BuyMyBills" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={`bg-white`}
        suppressHydrationWarning
      >
        <MainProvider>
          <ThemeProvider>
            {/* {
              isAuthRoutes ? null : <AppHeader />
            } */}
            {children}
          </ThemeProvider>
        </MainProvider>
      </body>
    </html>
  );
}
