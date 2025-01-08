import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Amigo invisible - Gratis y sin registro",
  description: "Organiza tu amigo invisible de forma sencilla y rápida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <meta name="google-adsense-account" content="ca-pub-6432516335953538"></meta>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
