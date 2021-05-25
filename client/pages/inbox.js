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
import ReceivedFriendRequestList from "../containers/inbox/ReceivedFriendRequestList";
import PendingMissionList from "../containers/inbox/PendingMissionList";
import RefreshButton from "../components/refresh_button";

const useStyles = makeStyles({
  tabTitle: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: { main: HUE[700], contrastText: "#fff" },
  },
});

export default function Inbox({ userInfo }) {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <MainLayout componentName="Inbox">
      <RefreshButton />

      <MuiThemeProvider theme={theme}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Task requests" className={classes.tabTitle} />
          <Tab label="Friend requests" className={classes.tabTitle} />
        </Tabs>
      </MuiThemeProvider>

      {value === 0 ? (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginBottom: "5rem" }}
        >
          <PendingMissionList />
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginBottom: "5rem" }}
        >
          <ReceivedFriendRequestList />
        </Grid>
      )}
    </MainLayout>
  );
}
