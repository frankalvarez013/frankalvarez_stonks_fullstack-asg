import Thumbnail from "./Thumbnail";
import Image from "next/image";
import defAvatar from "../public/defAvatar.svg";
import Link from "next/link";
export default function PreviewUser({ stream }) {
  console.log(stream);
  return (
    <div>
      <Link
        href={`/${stream.username}`}
        className="relative inline-block  bg-orange-600 "
      >
        <Thumbnail></Thumbnail>
      </Link>
      <div className="flex items-center mt-2">
        <div className=" w-14">
          <Image
            src={stream.users?.avatar_url!}
            alt={stream.users?.name!}
            width={50}
            height={50}
            className="rounded-full "
          ></Image>
        </div>

        <div className="">
          <div className="font-bold">{stream.title} </div>
          <div className="text-sm">{stream.username} </div>
          <div className="text-sm">
            {stream.active ? <div>Online: 🟢</div> : <div>🔴 </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
