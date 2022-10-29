import { Button, Input } from "@material-tailwind/react";

import InfoCard from "../components/InfoCard";
import Loading from "../components/Loading";
import axios from "axios";
import cc from "../data/cycles.json";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [cycles, setCycles] = useState(
    cc.cycles.slice(cc.cycles.length - 3, cc.cycles.length - 2)
  );
  const [token, setToken] = useState(
    // ""
    "801f427a-938a-4c55-8805-0bfcc4243967|XpLZEp2zaWBNGBCU5DMhBKWu3QkgKaj1W6Syfuqy28iiUFh8"
  );
  const [email, setEmail] = useState("drmikhailova@gmail.com");
  const [password, setPassword] = useState("hicseB-mehta7-buhwuf");

  const loginToClue = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/tokens", {
        email,
        password,
      });
      console.log(response.data.token.access_token);
      if (response.data.token.access_token) {
        setLoading(false);
        setToken(response.data.access_token);
        const total = response.data.cycles.length;
        setCycles(response.data.cycles.slice(total - 3, total));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-10 mx-24">
      {token ? (
        <div>
          We, as women need to take care of ourselves and listen to our bodies.
          {cycles.map((c) => (
            <div key={c.start} className="flex gap-4">
              <InfoCard data={c}></InfoCard>
            </div>
          ))}
        </div>
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
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <div className="h-24 flex items-center justify-center">
              {" "}
              {loading ? (
                <Loading />
              ) : (
                <Button
                  color="purple"
                  onClick={() => loginToClue(email, password)}
                >
                  Login to Clue
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
