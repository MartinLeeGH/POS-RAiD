import type { Metadata } from "next";
import "./globals.css";
import ToastContainerComponent from "./_components/_common/_toast/toast";

export const metadata: Metadata = {
  title: "RAiD POS System",
  description: "POS System for RAiD Supermarket",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainerComponent />
      </body>
    </html>
  );
}
