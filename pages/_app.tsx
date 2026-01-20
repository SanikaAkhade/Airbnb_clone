import type { AppProps } from "next/app";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

import { ContextProvider } from "../context/store";

import "../styles/globals.css";
import "../styles/reactDateRange.css";

import SignInPage from "../pages/signin";
import SignUpPage from "../pages/signup";

const progressBar = new ProgressBar({
  size: 3,
  color: "#FF385C",
  className: "z-50",
  delay: 80,
});

Router.events.on("routeChangeStart", progressBar.start);
Router.events.on("routeChangeComplete", progressBar.finish);
Router.events.on("routeChangeError", progressBar.finish);

function MyApp({ Component, pageProps, router }: AppProps) {
  
  if (router.pathname === "/signin") {
    return (
      <ContextProvider>
        <SignInPage />
      </ContextProvider>
    );
  }

  if (router.pathname === "/signup") {
    return (
      <ContextProvider>
        <SignUpPage />
      </ContextProvider>
    );
  }

 
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
