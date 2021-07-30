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

  useEffect(() => {
    CheckLoggedIn()
      .then((res) => {
        if (res.ok === false) router.push("/login");
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

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0db3ff" />
        <meta name="description" content="The app for assigning tasks" />
        <meta
          name="keywords"
          content="chekchat, task app, productivity app, chat app"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="og:title"
          property="og:title"
          content={`ChekChat | ${componentName}`}
        />
        <meta
          property="og:image"
          content="https://www.chekchat.xyz/images/192x192.png"
        />
        <link rel="canonical" href="https://chekchat.xyz" />
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
              {roomTitle ? roomTitle : componentName}
            </Typography>

            {componentName !== "Notifications" &&
              componentName !== "Chat" &&
              componentName !== "Profile" && (
                <Bell
                  componentName={componentName}
                  notificationCount={notificationCount}
                />
              )}

            {componentName !== "Notifications" &&
              componentName !== "Chat" &&
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
