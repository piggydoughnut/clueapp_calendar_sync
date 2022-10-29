import { Button, Input } from "@material-tailwind/react";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginToClue = async (email, password) => {
    try {
      const tokenDetails = await axios.post("/api/tokens", {
        email,
        password,
      });
      console.log(tokenDetails);
      if (tokenDetails.data.access_token) {
        setLoggedIn(true);
        setToken(tokenDetails.data.access_token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <h2>Congrats you are in {token}</h2>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-16">
            Sync your Clue app data to Google calendar
          </h1>
          <div className="flex gap-2 flex-col">
            <Input
              label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              label="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button color="purple" onClick={() => loginToClue(email, password)}>
              Login to Clue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
