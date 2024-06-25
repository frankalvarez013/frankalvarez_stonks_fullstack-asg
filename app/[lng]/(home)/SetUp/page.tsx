import { createClient } from "@/utils/supabase/server";
import InitUser from "@/store/initUser";
import SetUpForm from "./setUpForm";
export default async function SetUp() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <SetUpForm></SetUpForm>
      <InitUser user={data.user}></InitUser>
    </div>
  );
}
