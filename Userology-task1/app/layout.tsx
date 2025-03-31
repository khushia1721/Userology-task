import type React from "react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/lib/redux/provider";
import Header from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CryptoWeather Nexus | Real-time Dashboard",
  description:
    "Your all-in-one dashboard for weather data, cryptocurrency information, and news updates in real-time",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <div className="relative min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 container max-w-7xl mx-auto py-8 px-4 md:px-6 lg:px-8">
                {children}
              </main>
              <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>
            <Toaster
              position="bottom-right"
              expand={false}
              richColors
              closeButton
              theme="system"
              toastOptions={{
                duration: 5000,
                classNames: {
                  toast: "sonner-toast-custom",
                  title: "sonner-title-custom",
                  description: "sonner-description-custom",
                  actionButton: "sonner-action-button",
                  cancelButton: "sonner-cancel-button",
                  closeButton: "sonner-close-button",
                },
              }}
            />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
