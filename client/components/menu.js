import {
  SwipeableDrawer,
  makeStyles,
  List,
  ListItem,
  Button,
  ListItemText,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import { useState } from "react";
import utilStyles from "../styles/utils.module.css";

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
  },
  fullList: {
    width: "auto",
  },
  root: {
    opacity: 0.5,
  },
});

export default function Menu() {
  const classes = useStyles();
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
      <List>
        {menuList.slice(0, 4).map((i) => {
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
      <Button onClick={toggleDrawer} style={{ textAlign: "left" }}>
        <MenuIcon className={utilStyles.icon} style={{ fontSize: "2.5rem" }} />
      </Button>
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
