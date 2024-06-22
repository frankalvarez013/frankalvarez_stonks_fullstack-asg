import DeployButton from "../../components/DeployButton";
import AuthButton from "../../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { useTranslation } from "../i18n";
import Link from "next/link";
export default async function Index({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  const supabase = createClient();
  const { data: notes, error } = await supabase.from("notes").select();

  if (error) {
    console.error("Error fetching notes:", error);
    return <pre>Error fetching notes: {error.message}</pre>;
  }
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div>
        <h1>{t("title")}</h1>
        <pre>{JSON.stringify(notes, null, 2)}</pre>
        <Link href={`/${lng}/username`}>{t("to-second-page")}</Link>
        <Link href={`/${lng}/client-page`}>{t("to-client-page")}</Link>
      </div>
    </div>
  );
}
