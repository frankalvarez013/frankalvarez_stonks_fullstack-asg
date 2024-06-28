import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import * as emoji from "node-emoji";

const EmojiBar = ({ message, setMessage }) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const [username, setUsername] = useState("");
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const sent_from = pathname.substring(pathname.lastIndexOf("/") + 1);

      const { data: dataName, error } = await supabase
        .from("stream")
        .select("*")
        .eq("username", sent_from)
        .single();

      if (dataName === undefined || error) {
        console.error(error);
      } else {
        const emojiArray = dataName?.emojis || [];
        const emojifiedArray = emojiArray.map((emojiStr) =>
          emoji.emojify(emojiStr)
        );
        setEmojis(emojifiedArray);
        setUsername(dataName.username || "");
      }
      setLoading(false);
    };

    fetchData();
  }, [pathname]);

  const handleEmojiClick = (e) => {
    const buttonEmoji = e?.currentTarget.textContent;
    const textEmoji = emoji.unemojify(buttonEmoji);
    setMessage((prevMessage) => prevMessage + textEmoji);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white pt-3 px-2">
      {`${username} Emojis!`}
      <div className="min-h-16 flex gap-5 ">
        {emojis.map((emoji, index) => (
          <button key={index} onClick={handleEmojiClick}>
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiBar;
