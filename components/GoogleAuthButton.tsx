import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";

const GoogleAuthButton = ({ googleAuthUrl }: { googleAuthUrl: string }) => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push(googleAuthUrl)}>Auth with Google</Button>
  );
};

export default GoogleAuthButton;
