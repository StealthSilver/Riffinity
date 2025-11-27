import type { Metadata } from "next";
import "./globals.css";
import { Maven_Pro, Poppins } from "next/font/google";
import siteData from "../data";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-maven-pro",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: siteData.name,
  description: siteData.description,
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mavenPro.variable} ${poppins.variable}`}>
      <body className="bg-[#080906] font-sans">{children}</body>
    </html>
  );
}
