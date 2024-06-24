import { createClient } from "@/utils/supabase/server";
import { useTranslation } from "../../i18n";
import EmblaCarousel from "../../../components/EmblaCarousel";
import "./embla.css";
import PreviewUser from "@/components/PreviewUser";
import Image from "next/image";
import Illustration from "../../../public/IllustrationInvest.svg";

const OPTIONS = { align: "start" };
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default async function Index({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  const supabase = createClient();
  // const { data: notes, error } = await supabase.from("notes").select();

  // if (error) {
  //   return <pre>Error fetching notes: {error.message}</pre>;
  // }
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
      <div className="w-full">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
}
