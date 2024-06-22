import Thumbnail from "./Thumbnail";
import Image from "next/image";
import defAvatar from "../public/defAvatar.svg";
export default function PreviewUser() {
  return (
    <div>
      <Thumbnail></Thumbnail>
      <div className="flex items-center gap-2 mt-2">
        <div className=" w-14">
          <Image alt="Avatar" src={defAvatar}></Image>
        </div>
        <div className="">
          <div className="font-bold">TITLE </div>
          <div className="text-sm">NAME </div>
          <div className="text-sm">TYPE STREAM</div>
        </div>
      </div>
    </div>
  );
}
