import Head from "next/head";
import styles from "./main_layout.module.css";
import Menu from "../components/menu";
import Bell from "../components/bell";
import Chat from "../components/chat";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadUserInfoAsync, selectUserInfo } from "../features/userSlice";
import {
  selectNotificationCount,
  loadNotificationCountAsync,
} from "../features/notificationSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CheckLoggedIn from "../helpers/checkLoggedIn";
import { useCookies } from "react-cookie";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: "fixed",
    zIndex: 2,
    top: 0,
  },
  title: {
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  toolBar: {
    display: "grid",
    gridTemplateColumns: "1fr 18fr 1fr 1fr",
    backgroundColor: "#0db3ff",
    margin: "0",
  },
});

export default function MainLayout({ children, componentName, roomTitle }) {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
  useEffect(() => {
    CheckLoggedIn()
      .then((res) => {
        if (res.ok === true) setCookie("loggedIn", true);

        if (res.ok === false) {
          removeCookie("loggedIn");
          setCookie("redirectLogin", true);
          router.push("/login");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const userInfo = useSelector(selectUserInfo);
  const notificationCount = useSelector(selectNotificationCount);
  useEffect(() => {
    dispatch({ type: "user/subscribe" });
    dispatch(loadUserInfoAsync());
    dispatch(loadNotificationCountAsync());
  }, []);

  useEffect(() => {
    if (componentName !== "Chat Room") localStorage.removeItem("chatReloaded");
  }, []);

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

      <header className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Menu componentName={componentName} userInfo={userInfo} />

            <Typography variant="h5" className={classes.title}>
              {componentName !== "Chat Room" && componentName}
              {componentName === "Chat Room" && roomTitle}
            </Typography>

            {componentName !== "Notifications" &&
              componentName !== "Chat" &&
              componentName !== "Chat Room" &&
              componentName !== "Profile" && (
                <Bell
                  componentName={componentName}
                  notificationCount={notificationCount}
                />
              )}

            {componentName !== "Notifications" &&
              componentName !== "Chat" &&
              componentName !== "Chat Room" &&
              componentName !== "Profile" && (
                <Chat componentName={componentName} />
              )}
          </Toolbar>
        </AppBar>
      </header>

      <main className={roomTitle ? styles.main_for_chatroom : styles.main}>
        {children}
      </main>
    </div>
  );
}
