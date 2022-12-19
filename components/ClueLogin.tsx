import { Button, Input } from "@material-tailwind/react";

import Link from "next/link";
import Loading from "../components/Loading";
import axios from "axios";
import { useState } from "react";

export default function ClueLogin({
  setCycleData,
  getUserData,
  buttonTitle = "Login to Clue",
}: {
  setCycleData?: any;
  getUserData?: any;
  buttonTitle?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginToClue = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/tokens", {
        email,
        password,
      });
      if (getUserData) {
        getUserData({ email, password });
      }
      if (response.data.token.access_token) {
        setLoading(false);
        const total = response.data.cycles.length;
        if (setCycleData) {
          setCycleData(response.data.cycles.slice(total - 3, total - 2)[0]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex gap-2 flex-col">
      <Input
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input
        label="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></Input>
      <div className="h-auto flex items-center justify-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col w-full">
            <Button
              className="bg-secondaryButton"
              onClick={() => loginToClue(email, password)}
            >
              {buttonTitle}
            </Button>
            <Link
              href="/how-to/set-clue-password"
              target={"_blank"}
              className="hover:opacity-70 underline text-sm mt-2 text-center"
            >
              I dont know my access details for Clue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
