import Head from "next/head";
import styles from "./main_layout.module.css";
import Menu from "../components/menu";
import Bell from "../components/bell";

export default function MainLayout({ children, componentName }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Chatting App for Your Workspace" />
        <link rel="image_src" href="/logo192.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Chek | {componentName}</title>
      </Head>

      <header className={styles.header}>
        <Menu componentName={componentName} />
        <h1>{componentName}</h1>
        <Bell componentName={componentName} />
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
