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
  },
  toolBar: {
    display: "grid",
    gridTemplateColumns: "1fr 18fr 1fr 1fr",
    backgroundColor: "#0db3ff",
    margin: "0",
  },
});

export default function MainLayout({ children, componentName }) {
  const classes = useStyles();
  const dispatch = useDispatch();

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
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="The app for assigning missions" />
        <link rel="image_src" href="/logo192.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>ChekChat | {componentName}</title>
      </Head>

      <header className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <Menu componentName={componentName} userInfo={userInfo} />

            <Typography variant="h5" className={classes.title}>
              {componentName}
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

      <main className={styles.main}>{children}</main>
    </div>
  );
}
