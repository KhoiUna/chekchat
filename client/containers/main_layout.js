import Head from "next/head";
import styles from "./main_layout.module.css";
import Menu from "../components/menu";
import Bell from "../components/bell";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolBar: {
    display: "grid",
    gridTemplateColumns: "1fr 18fr 1fr",
    backgroundColor: "#0db3ff",
    margin: "0",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0db3ff",
    },
  },
});

export default function MainLayout({ children, componentName }) {
  const classes = useStyles();

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

      <header className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu componentName={componentName} />
            </IconButton>

            <Typography variant="h4" className={classes.title}>
              {componentName}
            </Typography>

            <Bell componentName={componentName} />
          </Toolbar>
        </AppBar>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
