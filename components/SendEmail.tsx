import { Html, Button } from "@react-email/components";

export function Email({ name, link }) {
  console.log("email react", name, link);
  return (
    <Html>
      <h1>Hi, {name}!</h1>
      <p>
        Your Streamer is online! <br></br> Here is the link to his stream!
        <br />
        <Button
          style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
          href={`${process.env.NEXT_PUBLIC_HOST_URL}/${link}`}
        >
          Join Live
        </Button>
      </p>
    </Html>
  );
}

export default Email;
