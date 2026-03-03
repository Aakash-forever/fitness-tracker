import "./globals.css";
import { Inter, Sora } from "next/font/google";
import Layout from "@/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={`${inter.variable} ${sora.variable} bg-[#0A0D12] text-[#F3F4F6] antialiased`}>
  <div className="relative min-h-screen overflow-hidden cyber-grid cyber-noise">

    <div className="absolute -top-40 -right-40 w-150 h-150
      bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)]
      blur-3xl pointer-events-none"
    />

    <Layout>{children}</Layout>

  </div>
</body>
    </html>
  );
}