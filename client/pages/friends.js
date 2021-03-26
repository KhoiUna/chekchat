import MainLayout from "../containers/main_layout";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import HUE from "@material-ui/core/colors/blue";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import utilStyles from "../styles/utils.module.css";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import FriendPopup from "../components/friends/friend_popup";
import FriendList from "../containers/friends/FriendList";
import FriendRequestList from "../containers/friends/FriendRequestList";

const useStyles = makeStyles({
  button: {
    borderRadius: "50%",
    margin: "4px 2px",
    padding: "1rem",
    position: "fixed",
    bottom: "1rem",
    right: "0.8rem",
    zIndex: 1,
  },
  tabTitle: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: { main: HUE[700], contrastText: HUE[700] },
  },
});
const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: HUE[800] },
  },
});

export default function Friends() {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = (state) => {
    setShowPopup(!state);
  };

  return (
    <MainLayout componentName="Friends">
      <MuiThemeProvider theme={theme}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Your friends" className={classes.tabTitle} />
          <Tab label="Sent requests" className={classes.tabTitle} />
        </Tabs>
      </MuiThemeProvider>

      {value === 0 ? (
        <Grid container direction="column" justify="center" alignItems="center">
          <FriendList />
        </Grid>
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          <FriendRequestList />
        </Grid>
      )}

      {showPopup && (
        <FriendPopup showPopup={showPopup} togglePopup={togglePopup} />
      )}

      <MuiThemeProvider theme={buttonTheme}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => togglePopup(showPopup)}
        >
          <PersonAddIcon
            className={utilStyles.icon}
            style={{ fontSize: "2rem" }}
          />
        </Button>
      </MuiThemeProvider>
    </MainLayout>
  );
}
