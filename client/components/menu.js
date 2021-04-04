import {
  SwipeableDrawer,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";
import { useState } from "react";
import utilStyles from "../styles/utils.module.css";
import { useRouter } from "next/router";
import InboxIcon from "@material-ui/icons/Inbox";
import SendIcon from "@material-ui/icons/Send";
import ListAltIcon from "@material-ui/icons/ListAlt";
import EventIcon from "@material-ui/icons/Event";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";

const menuList = [
  { name: "Inbox", icon: <InboxIcon /> },
  { name: "Sending", icon: <SendIcon /> },
  { name: "Todo", icon: <ListAltIcon /> },
  { name: "Calendar", icon: <EventIcon /> },
  { name: "Friends", icon: <GroupIcon /> },
  { name: "Settings", icon: <SettingsIcon /> },
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
});

export default function Menu({ componentName }) {
  const classes = useStyles();

  const router = useRouter();
  const goBack = () => router.back();

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

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List className={classes.list}>
        <ListItem>
          <ListItemText>
            <h2>Menu</h2>
          </ListItemText>
        </ListItem>

        {menuList.slice(0, 5).map((i) => {
          const href =
            i.name === "Sending" ? "/assigning" : `/${i.name.toLowerCase()}`;
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
      {componentName !== "Notifications" && componentName !== "Chat" && (
        <IconButton onClick={toggleDrawer}>
          <MenuIcon className={utilStyles.icon} style={{ fontSize: "2rem" }} />
        </IconButton>
      )}

      {(componentName === "Notifications" || componentName === "Chat") && (
        <IconButton onClick={goBack}>
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
