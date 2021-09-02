import "../styles/global.css";
import { wrapper } from "../app/store";
import Head from "next/head";
import TagManager from "react-gtm-module";
import { useEffect } from "react";

const tagManagerArgs = {
  id: "GTM-W6PK98F",
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

  return (
    <>
      <Head>
        {/* FIXME: Cancel service worker for now */}
        {/* <script type="module" src="/pwabuilder-sw-register.js"></script> */}
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
