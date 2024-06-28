import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

const Switch = ({ StreamerInfo }) => {
  const [isChecked, setIsChecked] = useState(false);
  const supabase = createClient();
  let stream = null;

  useEffect(() => {
    const updateStreamStatus = async (isChecked) => {
      try {
        let data, error;
        if (isChecked) {
          const responseStream = await supabase
            .from("stream")
            .update({
              username: StreamerInfo.username,
              active: true,
            })
            .eq("id", StreamerInfo.id)
            .select();
          data = responseStream.data;
          error = responseStream.error;

          try {
            const getFollowers = responseStream.data?.filter(
              (stream) => stream.username === StreamerInfo.username
            );
            if (getFollowers === undefined) {
            } else {
              const responseStreamPost = await fetch("/api/stream", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  followers: getFollowers[0].followers,
                  streamerName: StreamerInfo.username,
                }),
              });
              const data = await responseStreamPost.json();
              if (responseStreamPost.ok) {
              } else {
                console.error("API call failed:", data);
              }
            }
          } catch (error) {
            console.error("API call failed:", error);
          }
        } else {
          const responseStreamDelete = await supabase
            .from("stream")
            .upsert({ id: StreamerInfo.id, active: false })
            .select();

          data = responseStreamDelete.data;
          error = responseStreamDelete.error;
        }

        if (error) {
          console.error("Error updating stream status:", error);
          return;
        }

        if (data) {
          const stream = data;
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    updateStreamStatus(isChecked);
  }, [isChecked]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="flex cursor-pointer select-none rounded-3xl gap-7 items-center">
        <div>Stream</div>
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? "bg-orange-500" : " bg-white border-orange-500 border"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue transition ${
              isChecked ? "translate-x-full bg-white" : " bg-orange-500"
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default Switch;
