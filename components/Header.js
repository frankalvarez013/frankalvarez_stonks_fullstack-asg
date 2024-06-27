import AuthButton from "./AuthButton";
import DeployButton from "./DeployButton";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";
export default function Header({ lng }) {
  return (
    <nav className="fixed w-full bg-bd-background bg-[#FF9B0F] flex justify-center h-12">
      <div className="w-full max-w-[115rem] flex justify-between items-center p-3 text-sm">
        <div className="py-2 font-bold px-3 flex rounded-md no-underline items-center gap-2">
          <a href={`${lng}/`}>
            <Image
              priority
              src={Logo}
              width={45}
              alt="Image of hand with moneybag"
              className=" hover:bg-white"
            ></Image>
          </a>
        </div>
        {<AuthButton />}
      </div>
    </nav>
  );
}
