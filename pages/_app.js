import "/styles/globals.css";

import ReactGA from "react-ga4";
import { ThemeProvider } from "@material-tailwind/react";

ReactGA.initialize(process.env.NEXT_PUBLIC_GA);
ReactGA.send("pageview");
export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
