import MainLayout from "../../containers/main_layout";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { buttonTheme } from "../../themes/theme";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ReceivedChat from "../../containers/chat/ReceivedChat";
import SentChat from "../../containers/chat/SentChat";

const useStyles = makeStyles({
  tabTitle: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
});

export default function Chat({}) {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <MainLayout componentName="Chat">
      <MuiThemeProvider theme={buttonTheme}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Tasks received" className={classes.tabTitle} />
          <Tab label="Tasks sent" className={classes.tabTitle} />
        </Tabs>
      </MuiThemeProvider>

      {value === 0 ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <ReceivedChat />
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <SentChat />
        </Grid>
      )}
    </MainLayout>
  );
}
