import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; // Or Space_Grotesk if you switched
import "./globals.css";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logan Kairns | Developer",
  description: "Portfolio and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrains.className} bg-[#0a0a0a] text-stone-200 antialiased selection:bg-stone-700 selection:text-white`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}