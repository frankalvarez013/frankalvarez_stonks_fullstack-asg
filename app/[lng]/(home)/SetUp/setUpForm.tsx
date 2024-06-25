"use client";
import { useUser } from "@/store/user";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function SetUpForm() {
  const supabase = createClient();
  const [userName, setUserName] = useState("");
  const [liveEmail, setLiveEmail] = useState(true);
  const [liveNotif, setLiveNotif] = useState(true);
  const user = useUser((state) => state.user);
  const router = useRouter();
  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userName, liveEmail, liveNotif);
    console.log("hey", supabase);
    if (user?.id) {
      console.log("attempting update...");
      const { error } = await supabase
        .from("users")
        .update({
          username: userName,
          live_email: liveEmail,
          live_notif: liveNotif,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Update error:", error);
      } else {
        console.log("Update successful");
        router.push("/");
      }
    } else {
      console.error("No user ID found");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-orange-600 border p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-gray-900">
        Finish Completing Your Acount
      </h2>
      <h2 className="text font-light mb-6 text-gray-500">
        Just a couple of more steps!
      </h2>
      <div className="mb-5">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Create a Username
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={userName}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter a username"
          required
        />
      </div>
      <div className="mb-5">
        <div className="font-bold text-lg">Notification Settings </div>
        <div className="mb-4 flex mt-4">
          <label htmlFor="notif1" className="text-gray-600 basis-4/5">
            {" "}
            Send Email When Followed Streamer Is Live
          </label>
          <input
            type="checkbox"
            id="notif1"
            name="notif1"
            className=" h-6  m-auto"
            onChange={() => {
              setLiveEmail(!liveEmail);
            }}
            defaultChecked
          />
          <br />
        </div>
        <div className="mb-4 flex">
          <label htmlFor="notif2" className=" text-gray-600 basis-4/5">
            {" "}
            Send Push Notification When Followed Streamer Is Live
          </label>
          <input
            type="checkbox"
            id="notif2"
            name="notif2"
            className=" h-5 m-auto"
            onChange={() => {
              setLiveNotif(!liveNotif);
            }}
            defaultChecked
          />
          <br />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </form>
  );
}
