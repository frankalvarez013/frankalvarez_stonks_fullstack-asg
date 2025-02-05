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

    username = dataUser;
  }

  return (
    <nav className="fixed w-full bg-bd-background bg-[#FF9B0F] flex justify-center h-12">
      <div className="w-full max-w-[115rem] flex justify-between items-center p-3 text-sm">
        <div className="py-2 font-bold px-3 flex rounded-md no-underline items-center gap-2">
          <a
            href={`/${lng}`}
            className="group hover:fill-green-800 flex items-center gap-3 hover:text-green-800"
          >
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 1024 1024"
              className="group-hover:fill-green-800"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="group-hover:fill-green-800"
                d="M865.01 599.07c-30.39-16.39-67.2-14.82-96.07 4.18l-194.73 128h-38.49c8.11-16.83 13.04-35.45 13.04-55.34v-54.59H292.57v-72.93H109.72v402.47h182.86v-36.57h339.9l238.79-153.77c26.95-17.36 43.04-46.84 43.04-78.88a93.778 93.778 0 0 0-49.3-82.57zM219.43 877.71h-36.57V621.53h36.57v256.18z m612.22-178.67l-220.68 142.1h-318.4V694.46h179.85c-7.64 21.39-28.12 36.75-52.11 36.75h-54.2v0.04h-0.71v73.14h230.7l213.02-140.04c9.34-6.11 17.89-2.64 21.18-0.91 3.27 1.77 10.86 7.07 10.86 18.2a20.652 20.652 0 0 1-9.51 17.4zM378.87 502.62c-20.45-35.7-31.25-76.48-31.25-117.91 0-131.07 106.6-237.71 237.66-237.71 131.04 0 237.64 106.64 237.64 237.71 0 41.46-10.8 82.25-31.27 117.95l63.46 36.36c26.79-46.75 40.95-100.11 40.95-154.3 0-171.41-139.41-310.86-310.79-310.86s-310.8 139.45-310.8 310.86c0 54.16 14.14 107.5 40.93 154.27l63.47-36.37z"
                fill="#0F1F3C"
              />
              <path
                className="group-hover:fill-green-800"
                d="M668.79 244.79l-83.51 83.53-83.54-83.53-38.79 38.78 64.67 64.66h-54.67v54.86h84.9v35.45h-82.38v54.85h82.38v79.59h54.85v-79.59h82.36v-54.85H612.7v-35.45h84.88v-54.86h-54.65l64.65-64.66z"
                fill="#0F1F3C"
              />
            </svg>
            <div>STREAMER WORLD</div>
          </a>
        </div>
        <div className="flex items-center justify-center gap-5">
          {streamButton ? (
            <a
              className=" bg-green-200 p-2 rounded-full hover:bg-green-300  sm:w-12 sm:h-14 md:h-12 md:w-12 text-xs m-auto"
              href={`/${lng}/${username?.username}`}
            >
              Go Live!
            </a>
          ) : (
            ""
          )}

          {<AuthButton />}
        </div>
      </div>
    </nav>
  );
}
