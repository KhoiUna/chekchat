import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";

export default function Layout({ children, componentName }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Chatting App for Your Workspace" />
        <link rel="image_src" href="/logo192.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>ChekChat | {componentName}</title>
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <h1>CHEKCHAT</h1>
        </Link>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
