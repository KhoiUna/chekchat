import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";
import Logo from "../components/logo";

export default function Layout({ children, componentName }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="The app for assigning tasks" />
        <meta name="theme-color" content="#0db3ff" />
        <meta
          name="keywords"
          content="chekchat, task app, productivity app, chat app"
        />
        <meta name="twitter:card" content="summary" />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${
            process.env.NEXT_PUBLIC_APP_URL
          }/${componentName.toLowerCase()}`}
        />
        <meta property="og:title" content={`ChekChat | ${componentName}`} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_URL}/images/192x192.png`}
        />
        <meta
          property="og:description"
          content="The app for assigning tasks. Register to make your team more productive."
        />

        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
        <link rel="image_src" href="/images/192x192.png" />
        <link rel="apple-touch-icon" href="/images/192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>ChekChat | {componentName}</title>
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Logo
              style={{
                width: "5.5rem",
                height: "5.5rem",
                margin: 0,
              }}
            />
            <h1 className={styles.title}>hekChat</h1>
          </div>
        </Link>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
