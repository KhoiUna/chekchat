import "../styles/global.css";
import { wrapper } from "../app/store";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script type="module" src="/pwabuilder-sw-register.js"></script>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
