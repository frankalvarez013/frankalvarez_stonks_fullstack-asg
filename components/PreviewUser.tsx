import Thumbnail from "./Thumbnail";
import Image from "next/image";
import defAvatar from "../public/defAvatar.svg";
import Link from "next/link";

export default function PreviewUser() {
  return (
    <div>
      <Thumbnail></Thumbnail>
      <div className="flex items-center gap-2 mt-2">
        <Link href={`/Frankie`}>
          <div className=" w-14">
            <Image alt="Avatar" src={defAvatar}></Image>
          </div>
        </Link>

        <div className="">
          <div className="font-bold">TITLE </div>
          <div className="text-sm">NAME </div>
          <div className="text-sm">TYPE STREAM</div>
        </div>
      </div>
    </div>
  );
}
