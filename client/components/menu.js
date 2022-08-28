import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";
import { useState } from "react";
import utilStyles from "../styles/utils.module.css";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import InboxIcon from "@material-ui/icons/Inbox";
import SendIcon from "@material-ui/icons/Send";
import ListAltIcon from "@material-ui/icons/ListAlt";
import EventIcon from "@material-ui/icons/Event";
import GroupIcon from "@material-ui/icons/Group";
import FeedbackIcon from "@material-ui/icons/Feedback";
import Image from "next/image";
import imageLoader from "../helpers/imageLoader";
import { origin } from "../config/config";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

const menuList = [
  { name: "Inbox", icon: <InboxIcon /> },
  { name: "Send tasks", icon: <SendIcon /> },
  { name: "Todo", icon: <ListAltIcon /> },
  // { name: "Calendar", icon: <EventIcon /> },
  { name: "Friends", icon: <GroupIcon /> },
  { name: "Feedback", icon: <FeedbackIcon /> },
  { name: "Logout", icon: <ExitToAppIcon /> },
];

const useStyles = makeStyles({
  list: {
    width: 250,
    padding: 0,
  },
  fullList: {
    width: "auto",
  },
  root: {
    opacity: 0.5,
    padding: 0,
  },
  flex: {
    display: "flex",
    margin: "0.2rem 0",
  },
});

export default function Menu({ componentName, userInfo }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const router = useRouter();
  const goBack = () => {
    if (componentName === "Chat") {
      router.push("/todo");
      return;
    }
    if (componentName === "Chat Room") {
      dispatch({
        type: "chat/unsubscribe",
      });

      localStorage.removeItem("chatReloaded");

      router.push("/chat");
      return;
    }

    router.back();
    return;
  };

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState(!drawerState);
  };

  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
  const logout = async () => {
    try {
      const res = await fetch(`${origin}/api/user/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        removeCookie("loggedIn");
        router.push("/login");
      }
    } catch (err) {
      console.error("Error logging out user");
    }
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List className={classes.list}>
        <Link href={"/profile"}>
          <ListItem className={classes.flex} button>
            <div className={utilStyles.menu_image}>
              <Image
                loader={imageLoader}
                src={userInfo.avatarURL}
                priority
                height={60}
                width={60}
                alt={userInfo.username}
              />
            </div>

            <ListItemText>
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginLeft: "0.5rem", fontWeight: "bold" }}
              >
                {userInfo.username}
              </Typography>
            </ListItemText>
          </ListItem>
        </Link>

        {menuList.slice(0, 5).map((i) => {
          const href =
            i.name === "Send tasks" ? "/send" : `/${i.name.toLowerCase()}`;
          return (
            <Link href={href}>
              <ListItem
                button
                key={i.name}
                style={
                  i.name === componentName
                    ? { backgroundColor: "#c0c0c0" }
                    : null
                }
              >
                <ListItemText>
                  <IconButton>{i.icon}</IconButton>
                  {i.name === componentName ? <b>{i.name}</b> : i.name}
                </ListItemText>
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        {menuList.slice(5).map((i) => {
          const href = `/${i.name.toLowerCase()}`;
          if (i.name === "Logout")
            return (
              <ListItem button key={i.name} onClick={logout}>
                <ListItemText>
                  <IconButton>{i.icon}</IconButton>
                  {i.name}
                </ListItemText>
              </ListItem>
            );

          return (
            <Link href={href}>
              <ListItem
                button
                key={i.name}
                style={
                  i.name === componentName
                    ? { backgroundColor: "#c0c0c0" }
                    : null
                }
              >
                <ListItemText>
                  <IconButton>{i.icon}</IconButton>
                  {i.name === componentName ? <b>{i.name}</b> : i.name}
                </ListItemText>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );

  return (
    <>
      {componentName !== "Notifications" &&
        componentName !== "Chat" &&
        componentName !== "Chat Room" &&
        componentName !== "Profile" && (
          <IconButton onClick={toggleDrawer} aria-label="Open menu">
            <MenuIcon
              className={utilStyles.icon}
              style={{ fontSize: "2rem" }}
            />
          </IconButton>
        )}

      {(componentName === "Notifications" ||
        componentName === "Chat" ||
        componentName === "Chat Room" ||
        componentName === "Profile") && (
        <IconButton onClick={() => goBack(componentName)} aria-label="go back">
          <ArrowBackIosIcon
            className={utilStyles.icon}
            style={{ fontSize: "2rem" }}
          />
        </IconButton>
      )}

      {drawerState &&
        menuList.map((anchor) => (
          <SwipeableDrawer
            className={classes.root}
            anchor="left"
            open={drawerState}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
          >
            {list(anchor)}
          </SwipeableDrawer>
        ))}
    </>
  );
}
