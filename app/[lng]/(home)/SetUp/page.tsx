import { supabaseServer } from "@/utils/supabase/server2";
import InitUser from "@/store/initUser";
import SetUpForm from "./setUpForm";
export default async function SetUp() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getSession();
  console.log("AUTH - GeT USER", data.session!.user, error);
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <SetUpForm></SetUpForm>
      <InitUser user={data.session?.user}></InitUser>
    </div>
  );
}
