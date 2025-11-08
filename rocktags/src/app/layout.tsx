// src/app/layout.tsx
import "./globals.css";
import { Geist, Geist_Mono, Poppins, Roboto } from "next/font/google";
import GoogleMapsLoader from "./GoogleMapsLoader";


// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Metadata (allowed in Server Component)
export const metadata = {
  title: "UTA CatMap by ACM",
  description: "Generated with love by ACM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${roboto.variable} antialiased`}
      >
        {children}
        <GoogleMapsLoader />
      </body>
    </html>
  );
}