import Image from "next/image";

export default function Thumbnail() {
  return (
    <div className=" border border-black w-72 h-40 bg-white transform hover:translate-x-4 hover:-translate-y-4">
      {" "}
      <Image
        src="https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg"
        alt="Picture of Iframe"
        fill={true}
        className="w-full h-full"
      />
      Viewers{" "}
    </div>
  );
}
