import AuthButton from "./AuthButton";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
export default async function Header({ lng }) {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  let streamButton = false;
  let username;
  if (data.session) {
    streamButton = true;
    const { data: dataUser } = await supabase
      .from("users")
      .select("username")
      .eq("id", data.session?.user.id)
      .single();
    console.log("erm", data.session?.user.id, dataUser);
    username = dataUser;
  }

  return (
    <nav className="fixed w-full bg-bd-background bg-[#FF9B0F] flex justify-center h-12">
      <div className="w-full max-w-[115rem] flex justify-between items-center p-3 text-sm">
        <div className="py-2 font-bold px-3 flex rounded-md no-underline items-center gap-2">
          <Link href={`/${lng}`} replace>
            <Image
              priority
              src={Logo}
              width={45}
              alt="Image of hand with moneybag"
              className=" hover:bg-white"
            ></Image>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {streamButton ? (
            <Link
              width={45}
              className=" bg-green-200 p-2 rounded-full hover:bg-green-300"
              href={`/${lng}/${username?.username}`}
            >
              Go Live!
            </Link>
          ) : (
            ""
          )}

          {<AuthButton />}
        </div>
      </div>
    </nav>
  );
}
