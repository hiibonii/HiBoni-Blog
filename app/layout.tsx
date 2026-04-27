import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css"; // Harus di atas Navbar
import Navbar from "../components/navbar"; 
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

export const metadata = {
  title: "Alboni Visual Journal | Minimalist Design & Tech Blog",
  description: "Eksplorasi jurnal visual mengenai desain minimalis, teknologi modern, dan gaya hidup digital oleh Alboni.",
  openGraph: {
    title: "Alboni Visual Journal",
    description: "Inspirasi desain dan teknologi dalam balutan estetika minimalis.",
    images: ['/og-image.jpg'], // Pastikan ada gambar di folder public untuk preview di WA/Twitter
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Next.js otomatis nambahin meta viewport, jadi kita fokus ke body */}
      <body className={`${spaceGrotesk.className} antialiased bg-white text-black`}>
        <Navbar />
        {children}
        <GoogleAnalytics gaId="G-ERKXWS4MF0" />
        <footer className="mt-20 py-20 text-center border-t border-gray-50">
          <p className="text-[10px] text-gray-300 uppercase tracking-[0.3em] font-medium">
            © 2026 ALBONI JOURNAL
          </p>
        </footer>
      </body>
    </html>
  );
}