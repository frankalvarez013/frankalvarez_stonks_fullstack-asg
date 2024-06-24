"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import defAvatar from "../../../../public/defAvatar.svg";
import Image from "next/image";
export default async function Streaming({
  params,
}: {
  params: { username: string; lng: string };
}) {
  let userData = null;
  useEffect(() => {
    async function retrieveSession() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching notes:", error);
        return <pre>Error fetching notes: {error.message}</pre>;
      }
      userData = data;
    }
    retrieveSession();
  }, []);
  // console.log(userData);
  if (userData != null) {
    return (
      <>
        <h1>Not Connected broski !</h1>
        <Link href={`/${params.lng}`}>second page</Link>
      </>
    );
  }
  //80%
  return (
    <div className="w-full">
      <div className="w-full h-[calc(80vw/2)] bg-slate-500">
        <iframe
          src="https://www.youtube.com/embed/jfKfPfyJRdk"
          className=" w-full h-full object-cover"
        ></iframe>
      </div>
      <div className="flex w-full items-center justify-between gap-2 mt-2">
        <div className="flex gap-2">
          <div className="w-14">
            <Image alt="Avatar" src={defAvatar}></Image>
          </div>
          <div className="">
            <div className="font-bold">TITLE </div>
            <div className="text-sm">NAME </div>
            <div className="text-sm">TYPE STREAM</div>
          </div>
        </div>
        <div>
          <button>Follow</button>
        </div>
      </div>
    </div>
  );
}
