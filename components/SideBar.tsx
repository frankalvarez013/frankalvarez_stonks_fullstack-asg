"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function SideBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const supabase = createClient();
  const [followerStreams, setFollowerStreams] = useState([]);
  const [filteredPopularStreams, setFilteredPopularStreams] = useState([]);
  const [popularStreamsTotal, setPopularStreamsTotal] = useState([]);
  useEffect(() => {
    const update = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setIsAuthenticated(true);
      }
      const { data: followerStreams } = await supabase
        .from("stream")
        .select(`*,users (*)`)
        .contains("followers", [data.session?.user.id])
        .neq("id", data.session?.user.id);
      const { data: popularStreams } = await supabase
        .from("stream")
        .select(`*,users (*)`)
        .neq("id", data.session?.user.id);
      const { data: popularStreamsTotal } = await supabase
        .from("stream")
        .select(`*,users (*)`);
      setPopularStreamsTotal(popularStreamsTotal);
      let filteredPopularStreams;
      // console.log("Hey!", followerStreams, popularStreams);

      if (followerStreams && popularStreams) {
        setFollowerStreams(followerStreams || []);
        const followerStreamIds = followerStreams.map((stream) => stream.id);
        filteredPopularStreams = popularStreams.filter(
          (stream) => !followerStreamIds.includes(stream.id)
        );
        setFilteredPopularStreams(filteredPopularStreams);
      }
    };
    const streamSubscription1 = supabase
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "stream" },
        (payload) => {
          // console.log("Change receivedddd!", payload);
          update();
          // console.log(followerStreams, filteredPopularStreams);
        }
      )
      .subscribe();
    // const streamSubscription = supabase
    //   .from("stream")
    //   .on("*", (payload) => {
    //     console.log("Change received!", payload);
    //     update(); // Re-fetch the data when a change occurs
    //   })
    //   .subscribe();
    update();
  }, []);
  return (
    <div
      className="fixed top-12 left-0 z-40  w-56 h-screen transition-transform -translate-x-full lg:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 pt-8 overflow-y-auto flex flex-col gap-9 bg-[#FF9B0F]">
        {isAuthenticated ? (
          <div className="">
            <p className=" font-semibold ">Following</p>
            <ul className="space-y-2 font-medium">
              {followerStreams && followerStreams.length > 0 ? (
                followerStreams?.map((streamer) => (
                  <div>
                    <li>
                      <Link
                        href={`/${streamer.username}`}
                        className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                      >
                        <Image
                          src={streamer.users?.avatar_url!}
                          alt={streamer.users?.name!}
                          width={40}
                          height={40}
                          className="rounded-full"
                        ></Image>
                        <span className="ms-3 text-sm font-medium text-gray-600">
                          {streamer.username}
                        </span>
                      </Link>
                    </li>
                  </div>
                ))
              ) : (
                <p className=" text-sm font-medium text-gray-600">
                  Looks like you have no followers!
                </p>
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div>
          <p className=" font-semibold ">Popular Streamers</p>
          <ul className="space-y-2 font-medium">
            {isAuthenticated ? (
              <>
                {filteredPopularStreams && filteredPopularStreams.length > 0 ? (
                  filteredPopularStreams?.map((streamer) => (
                    <div>
                      <li>
                        <Link
                          href={`/${streamer.username}`}
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                        >
                          <Image
                            src={streamer.users?.avatar_url!}
                            alt={streamer.users?.name!}
                            width={40}
                            height={40}
                            className="rounded-full"
                          ></Image>
                          <span className="ms-3 text-lg font-bold">
                            {streamer.username}
                          </span>
                        </Link>
                      </li>
                    </div>
                  ))
                ) : (
                  <p className=" text-sm font-medium text-gray-600">
                    Looks like there are no streamers
                  </p>
                )}
              </>
            ) : (
              <>
                {popularStreamsTotal && popularStreamsTotal.length > 0 ? (
                  popularStreamsTotal?.map((streamer) => (
                    <div>
                      <li>
                        <Link
                          href={`/${streamer.username}`}
                          className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                        >
                          <Image
                            src={streamer.users?.avatar_url!}
                            alt={streamer.users?.name!}
                            width={40}
                            height={40}
                            className="rounded-full"
                          ></Image>
                          <span className="ms-3 text-lg font-bold">
                            {streamer.username}
                          </span>
                        </Link>
                      </li>
                    </div>
                  ))
                ) : (
                  <p className=" text-sm font-medium text-gray-600">
                    Looks like there are no streamers
                  </p>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
