import { createClient } from "@/utils/supabase/server";
import { useTranslation } from "../i18n";
import Link from "next/link";
import PreviewUser from "@/components/PreviewUser";
import Image from "next/image";
import Illustration from "../../public/IllustrationInvest.svg";
export default async function Index({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  const supabase = createClient();
  const { data: notes, error } = await supabase.from("notes").select();

  if (error) {
    console.error("Error fetching notes:", error);
    return <pre>Error fetching notes: {error.message}</pre>;
  }
  return (
    <div className="w-full h-full">
      {/* <h1>{t("title")}</h1> */}
      {/* <pre>{JSON.stringify(notes, null, 2)}</pre> */}
      <div className="w-full flex h-1/2 justify-center gap-10">
        <div className="text-6xl text-zinc-700 flex items-center justify-center">
          Investing Just <br /> Got Fun
        </div>
        <Image
          src={Illustration}
          alt="Illustration of Man Giving Advice"
          width={1}
          className="w-1/4 flex-grow max-w-96 min-w-96"
        ></Image>
      </div>
      <PreviewUser></PreviewUser>
      <Link href={`/${lng}/username`}>{t("to-second-page")}</Link>
      <Link href={`/${lng}/client-page`}>{t("to-client-page")}</Link>
    </div>
  );
}
