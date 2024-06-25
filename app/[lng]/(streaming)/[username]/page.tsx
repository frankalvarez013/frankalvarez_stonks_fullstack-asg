import { createClient } from "@/utils/supabase/server";
import InitUser from "@/store/initUser";
import Stream from "./Stream";

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
  console.log("Main Page Streamer:", streamerInfo);
  if (!streamerInfo) {
    <div>loading...</div>;
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
          <Stream StreamerInfo={streamerInfo}></Stream>
        </div>
        {data.session?.user ? (
          <InitUser user={data.session?.user}></InitUser>
        ) : (
          <>hi</>
        )}
      </>
    );
  }
}
