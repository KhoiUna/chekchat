import MainLayout from "../containers/main_layout";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import HUE from "@material-ui/core/colors/blue";
import { useState } from "react";
import ReceivedFriendRequestList from "../containers/notifications/ReceivedFriendRequestList";
import PendingMissionList from "../containers/notifications/PendingMissionList";

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

export default function Inbox() {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <MainLayout componentName="Inbox">
      <MuiThemeProvider theme={theme}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Mission requests" className={classes.tabTitle} />
          <Tab label="Friend requests" className={classes.tabTitle} />
        </Tabs>
      </MuiThemeProvider>

      {value === 0 ? (
        <Grid container direction="column" justify="center" alignItems="center">
          <PendingMissionList />
        </Grid>
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          <ReceivedFriendRequestList />
        </Grid>
      )}
    </MainLayout>
  );
}
