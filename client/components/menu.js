import {
  SwipeableDrawer,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Icon,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";
import { useState } from "react";
import utilStyles from "../styles/utils.module.css";
import { useRouter } from "next/router";

const menuList = [
  "Missions",
  "Todo",
  "Calendar",
  "Friends",
  "Profile",
  "Settings",
  "Logout",
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

        {menuList.slice(0, 4).map((i) => {
          const href = i === "Missions" ? "/assigning" : `/${i.toLowerCase()}`;
          return (
            <Link href={href}>
              <ListItem
                button
                key={i}
                style={
                  i === componentName ? { backgroundColor: "#c0c0c0" } : null
                }
              >
                <ListItemText>
                  {i === componentName ? <b>{i}</b> : i}
                </ListItemText>
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
      <List>
        {menuList.slice(4).map((i) => {
          const href = `/${i.toLowerCase()}`;
          if (i === "Logout")
            return (
              <ListItem button key={i} onClick={logout}>
                <ListItemText>
                  {i}
                  <IconButton>
                    <ExitToAppIcon />
                  </IconButton>
                </ListItemText>
              </ListItem>
            );

          return (
            <Link href={href}>
              <ListItem
                button
                key={i}
                style={
                  i === componentName ? { backgroundColor: "#c0c0c0" } : null
                }
              >
                <ListItemText>
                  {i === componentName ? <b>{i}</b> : i}
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
      {componentName !== "Notifications" ? (
        <IconButton onClick={toggleDrawer}>
          <MenuIcon className={utilStyles.icon} style={{ fontSize: "2rem" }} />
        </IconButton>
      ) : (
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
