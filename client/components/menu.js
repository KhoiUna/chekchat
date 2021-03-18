import {
  SwipeableDrawer,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";
import { useState } from "react";
import utilStyles from "../styles/utils.module.css";
import { useRouter } from "next/router";

const menuList = [
  "Assigning",
  "Todo",
  "Calendar",
  "Friends",
  "Profile",
  "Settings",
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
          const href = `/${i.toLowerCase()}`;
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
          return (
            <Link href={href}>
              <ListItem button key={i}>
                <ListItemText primary={i} />
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
          <MenuIcon
            className={utilStyles.icon}
            style={{ fontSize: "2.5rem" }}
          />
        </IconButton>
      ) : (
        <IconButton onClick={goBack}>
          <ArrowBackIosIcon
            className={utilStyles.icon}
            style={{ fontSize: "2.5rem" }}
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
