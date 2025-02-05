import { createClient } from "@/utils/supabase/server";
import InitUser from "@/store/initUser";
import Stream from "./Stream";
import Link from "next/link";
import HomePresence from "@/components/HomePresence";
export default async function Streaming({
  params,
}: {
  params: { username: string; lng: string };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  let streamerInfo = null;
  const getUserByUsername = async (username) => {
    let { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  };
  await getUserByUsername(params.username).then((user) => {
    if (user) {
      streamerInfo = user[0];
    }
  });
  const { data: stream } = await supabase
    .from("stream")
    .select("*")
    .eq("username", params.username)
    .single();
  if (!streamerInfo) {
    return (
      <>
        <div className="w-full flex flex-col gap-5 mt-20">
          <h1 className="text-gray-500">
            Seems like There is no account who has ever created a stream with
            that name!
          </h1>
          <a
            className=" hover:underline hover:text-blue-400 cursor-pointer"
            href={"/"}
          >
            Return Home
          </a>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full h-[calc(80vw/2)] bg-slate-500">
            <iframe
              src="https://www.youtube.com/embed/jfKfPfyJRdk"
              className="w-full h-full object-cover"
            ></iframe>
          </div>
          <Stream StreamerInfo={streamerInfo} stream={stream}></Stream>
        </div>
        {data.session?.user ? (
          <div>
            <InitUser user={data.session?.user}></InitUser>
            <HomePresence />
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
