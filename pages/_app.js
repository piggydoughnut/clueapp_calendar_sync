import "/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";
import { StoreProvider } from "easy-peasy";
import { ThemeProvider } from "@material-tailwind/react";
import store from "../helpers/store";

ReactGA.initialize(process.env.NEXT_PUBLIC_GA);
ReactGA.send("pageview");

export default function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    </StoreProvider>
  );
}
