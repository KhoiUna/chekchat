import MainLayout from "../containers/main_layout";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useState } from "react";
import Fab from "@material-ui/core/Fab";
import HUE from "@material-ui/core/colors/blue";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import FriendPopup from "../components/friends/friend_popup";
import FriendList from "../containers/friends/FriendList";
import FriendRequestList from "../containers/friends/FriendRequestList";
import UsersUtil from "../utils/UsersUtil";

const useStyles = makeStyles({
  button: {
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
    primary: { main: HUE[500], contrastText: "white" },
  },
});

export default function Friends({ userInfo }) {
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
    <MainLayout componentName="Friends" userInfo={userInfo}>
      {!showPopup && (
        <>
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

          {value === 0 ? <FriendList /> : <FriendRequestList />}

          <MuiThemeProvider theme={buttonTheme}>
            <Fab
              color="primary"
              aria-label="send mission"
              className={classes.button}
              onClick={() => togglePopup(showPopup)}
            >
              <PersonAddIcon style={{ fontSize: "2rem" }} />
            </Fab>
          </MuiThemeProvider>
        </>
      )}

      {showPopup && (
        <FriendPopup showPopup={showPopup} togglePopup={togglePopup} />
      )}
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const cookieObj = ctx.res.req.cookies;

  const userInfo = await UsersUtil.fetchUserInfoServerSide(cookieObj);

  return {
    props: { userInfo },
  };
}
