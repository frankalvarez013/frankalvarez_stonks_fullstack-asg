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
          const response = await supabase
            .from("stream")
            .upsert({ id: StreamerInfo.id, active: true })
            .select();

          data = response.data;
          error = response.error;
        } else {
          const response = await supabase
            .from("stream")
            .upsert({ id: StreamerInfo.id, active: false })
            .select();

          data = response.data;
          error = response.error;
        }

        if (error) {
          console.error("Error updating stream status:", error);
          return;
        }

        if (data) {
          const stream = data;
          console.log("Stream data:", stream);
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
