import Head from "next/head";
import Link from "next/link";
import Logo from "../components/logo";
import homeStyles from "../styles/home.module.css";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function Home({ children, componentName }) {
  return (
    <>
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
        <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
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
        <link rel="image_src" href="/logo192.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>ChekChat | {componentName}</title>
      </Head>

      <header className={homeStyles.header}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Link href="/">
            <div style={{ margin: 0 }}>
              <Logo
                style={{
                  width: "4rem",
                  height: "4rem",
                  margin: "0.3rem 0 0.3rem 1rem",
                  backgroundColor: "#0db3ff",
                  cursor: "pointer",
                }}
              />
            </div>
          </Link>

          <nav className={homeStyles.nav}>
            <Link href={"/login"}>
              <Typography
                variant="body1"
                gutterBottom
                className={homeStyles.nav_item}>
                Login
              </Typography>
            </Link>

            <Link href="/register">
              <Typography
                variant="body1"
                gutterBottom
                className={homeStyles.nav_item}>
                Register
              </Typography>
            </Link>

            <a
              style={{ textDecoration: "none" }}
              rel="noopener noreferrer"
              href={"https://github.com/KhoiUna/chekchat"}
              target="_blank">
              <Typography
                variant="body1"
                gutterBottom
                className={homeStyles.nav_item}>
                Source code
              </Typography>
            </a>
          </nav>
        </Grid>
      </header>

      <main className={homeStyles.main}>{children}</main>

      <footer className={homeStyles.footer}>
        <div className={homeStyles.footer_flex_container}>
          <section style={{ margin: "0 0 1.5rem 0" }}>
            <div className={homeStyles.footer_logo}>
              <Logo
                style={{
                  width: "4rem",
                  height: "4rem",
                  margin: 0,
                  backgroundColor: "#0db3ff",
                }}
              />
              <h1 className={homeStyles.title}>hekChat</h1>
            </div>
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontSize: "1.1rem" }}>
              The app for assigning tasks
            </Typography>
          </section>
        </div>

        <section className={homeStyles.copyright_section}>
          <Typography gutterBottom variant="subtitle2" style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} ChekChat
          </Typography>
        </section>
      </footer>
    </>
  );
}
