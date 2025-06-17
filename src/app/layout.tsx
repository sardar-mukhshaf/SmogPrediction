import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smog Detection using Machine Learning",
  description: "A complete guide to smog detection using machine learning with the help of Fullstack & Machine Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        {children}
      </body>
    </html>
  );
}
