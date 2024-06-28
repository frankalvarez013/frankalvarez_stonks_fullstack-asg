import { createClient } from "@/utils/supabase/server";
import { useTranslation } from "../../i18n";
import EmblaCarousel from "../../../components/EmblaCarousel";
import HomePresence from "@/components/HomePresence";
import "./embla.css";
import Image from "next/image";
import Illustration from "../../../public/IllustrationInvest.svg";
import InitUser from "@/store/initUser";
const OPTIONS = { align: "start" };
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default async function Index({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  // const { data: notes, error } = await supabase.from("notes").select();

  // if (error) {
  //   return <pre>Error fetching notes: {error.message}</pre>;
  // }
  if (data.session?.user) {
    const { data: dataStreams, error } = await supabase
      .from("stream")
      .select(`*,users (*)`)
      .neq("id", data.session?.user.id);
    return (
      <div className="w-full h-full">
        {/* <h1>{t("title")}</h1> */}
        {/* <pre>{JSON.stringify(notes, null, 2)}</pre> */}
        <div className="w-full flex h-1/2 justify-center flex-col lg:flex-row items-center lg:gap-10">
          <div className=" text-3xl lg:text-6xl text-zinc-700 flex items-center justify-center">
            {t("title")}
            <br /> Got Fun
          </div>
          <Image
            src={Illustration}
            alt="Illustration of Man Giving Advice"
            width={1}
            className="w-3/4 lg:w-1/4 flex-grow max-w-96 lg:min-w-96"
          ></Image>
        </div>
        <div className="w-full">
          <EmblaCarousel slides={dataStreams} options={OPTIONS} />
          <InitUser user={data.session?.user}></InitUser>
        </div>
        <HomePresence />
      </div>
    );
  } else {
    const { data: dataStreams, error } = await supabase
      .from("stream")
      .select(`*,users (*)`);
    return (
      <div className="w-full h-full">
        {/* <h1>{t("title")}</h1> */}
        {/* <pre>{JSON.stringify(notes, null, 2)}</pre> */}
        <div className="w-full flex h-1/2 justify-center gap-10">
          <div className="text-6xl text-zinc-700 flex items-center justify-center">
            {t("title")}
            <br /> Got Fun
          </div>
          <Image
            src={Illustration}
            alt="Illustration of Man Giving Advice"
            width={1}
            className="w-1/4 flex-grow max-w-96 min-w-96"
          ></Image>
        </div>
        <div className="w-full">
          <EmblaCarousel slides={dataStreams} options={OPTIONS} />
        </div>
      </div>
    );
  }
}
