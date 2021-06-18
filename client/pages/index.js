import Head from "next/head";
import Link from "next/link";
import Logo from "../components/logo";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="The app for assigning tasks" />
        <meta
          name="keywords"
          content="chekchat, task app, productivity app, chat app"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="og:title" property="og:title" content="ChekChat | Home" />
        <meta
          property="og:image"
          content="https://www.chekchat.xyz/logo192.png"
        />
        <link rel="canonical" href="https://chekchat.xyz/" />
        <link rel="image_src" href="/logo192.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>ChekChat | Home</title>
      </Head>

      <body>
        <header>
          <Logo
            style={{
              width: "5.5rem",
              height: "5.5rem",
              margin: 0,
              backgroundColor: "#0db3ff",
            }}
          />
        </header>
        <main>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </main>
      </body>
    </>
  );
}
