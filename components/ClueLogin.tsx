import { Button, Input } from "@material-tailwind/react";

import Loading from "../components/Loading";
import axios from "axios";
import { useState } from "react";

export default function ClueLogin({ setCycleData }: { setCycleData: any }) {
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
      if (response.data.token.access_token) {
        setLoading(false);
        const total = response.data.cycles.length;
        setCycleData(response.data.cycles.slice(total - 3, total - 2)[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center ">
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
        <div className="h-24 flex items-center justify-center">
          {" "}
          {loading ? (
            <Loading />
          ) : (
            <Button
              className="bg-secondaryButton"
              onClick={() => loginToClue(email, password)}
            >
              Login to Clue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
