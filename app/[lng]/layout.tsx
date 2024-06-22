import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)} className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Header></Header>
          {children}
          <Footer lng={lng}></Footer>
        </main>
      </body>
    </html>
  );
}
