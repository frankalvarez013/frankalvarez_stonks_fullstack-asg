import "../../globals.css";
import { dir } from "i18next";
import { languages } from "../../i18n/settings";
import Header from "../../../components/HeaderLive";
import { Footer } from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import { Inter } from "next/font/google";
import ChatBar from "../../../components/ChatSection";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
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
    <html lang={lng} dir={dir(lng)} className={inter.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col h-full">
          <Header lng={lng}></Header>
          <SideBar></SideBar>
          <ChatBar></ChatBar>
          <div className="flex flex-1 lg:ml-60 sm:mr-80 mt-12 overflow-auto h-full p-4">
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
