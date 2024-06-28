import React, { useState } from "react";
import * as emoji from "node-emoji";
import { createClient } from "@/utils/supabase/client";

export default function EmojiSelection({ initialStream }) {
  const [emojis, setEmojis] = useState(initialStream.emojis);
  const valBase = [":heart:", ":coffee:", ":unicorn:", ":pizza:"];
  const uniqueEmojis = valBase.filter((item) => !emojis.includes(item));
  const removeEmojis = valBase.filter((item) => emojis.includes(item));
  const supabase = createClient();

  const handleEmojiClick = async (e) => {
    const buttonEmoji = e?.currentTarget.textContent;
    const textEmoji = emoji.unemojify(buttonEmoji);

    // Update the stream in Supabase
    try {
      const { data, error } = await supabase
        .from("stream") // Replace 'stream' with your table name
        .update({ emojis: [...emojis, textEmoji] })
        .eq("username", initialStream.username); // Replace 'username' with your unique identifier field

      if (error) {
        console.error("Error updating emojis:", error);
      } else {
        // Update local state with the new emoji
        setEmojis((prevEmojis) => [...prevEmojis, textEmoji]);
      }
    } catch (error) {
      console.error("Error updating emojis:", error);
    }
  };
  const handleRemoveEmojiClick = async (e) => {
    const buttonEmoji = e?.currentTarget.textContent;
    const textEmoji = emoji.unemojify(buttonEmoji);

    // Update the stream in Supabase
    try {
      const newEmojis = emojis.filter((emoji) => emoji !== textEmoji);
      const { data, error } = await supabase
        .from("stream") // Replace 'stream' with your table name
        .update({ emojis: newEmojis })
        .eq("username", initialStream.username); // Replace 'username' with your unique identifier field

      if (error) {
        console.error("Error updating emojis:", error);
      } else {
        // Update local state with the new emoji
        setEmojis((prevEmojis) => newEmojis);
      }
    } catch (error) {
      console.error("Error updating emojis:", error);
    }
  };
  return (
    <div className="h-3/4 bg-white p-3 flex flex-col gap-10">
      <div className="text-bold text-xl">
        Add Emojis for your Users to use!!
      </div>
      <div className="w-full h-full bg-orange-100 p-4">
        {uniqueEmojis.length !== 0 ? (
          uniqueEmojis.map((emojiStr) => (
            <button key={emojiStr} onClick={handleEmojiClick}>
              {emoji.emojify(emojiStr)}
            </button>
          ))
        ) : (
          <div className="text-gray-400">Looks like we ran out!</div>
        )}
      </div>
      <div className="text-bold text-xl">
        Remove Emojis from Your Selection!!
      </div>
      <div className="w-full h-full bg-orange-100 p-4">
        {removeEmojis.length !== 0 ? (
          removeEmojis.map((emojiStr) => (
            <button key={emojiStr} onClick={handleRemoveEmojiClick}>
              {emoji.emojify(emojiStr)}
            </button>
          ))
        ) : (
          <div className="text-gray-400">Looks like we ran out!</div>
        )}
      </div>
    </div>
  );
}
