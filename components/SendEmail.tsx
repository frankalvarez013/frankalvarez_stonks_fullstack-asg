import Link from "next/link";
export default function SendEmail({ name, link }) {
  return (
    <div>
      <h1>Hi, {name}!</h1>
      <p>
        Your Streamer is online! <br></br> Here is the link to his stream!{" "}
        <br />
        <Link href={`fsalvarez.com/${link}`}></Link>
      </p>
    </div>
  );
}
