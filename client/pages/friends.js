import FriendTag from "../components/friends/friend_tag";
import FriendRequest from "../components/friends/friend_request";
import MainLayout from "../containers/main_layout";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import HUE from "@material-ui/core/colors/blue";

const friendsArray = [
  {
    username: "Test Test",
    email: "test@test.com",
    avatarURL: "/img/avatar.png",
  },
  {
    username: "Demo Demo",
    email: "demo@demo.com",
    avatarURL: "/img/avatar.png",
  },
  {
    username: "Khoi Tuan Nguyen",
    email: "knguyen@gmail.com",
    avatarURL: "/img/avatar.png",
  },
];

const theme = createMuiTheme({
  palette: {
    primary: { main: HUE[700], contrastText: HUE[700] },
  },
});

export default function Friends() {
  const [value, setValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
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
          <Tab label="Your friends" />
          <Tab label="Sent requests" />
        </Tabs>
      </MuiThemeProvider>

      {value === 0 ? (
        <Grid container direction="column" justify="center" alignItems="center">
          {friendsArray.map((item) => (
            <FriendTag
              username={item.username}
              email={item.email}
              avatarURL={item.avatarURL}
            />
          ))}
        </Grid>
      ) : (
        <Grid container direction="column" justify="center" alignItems="center">
          {friendsArray.map((item) => (
            <FriendRequest
              username={item.username}
              email={item.email}
              avatarURL={item.avatarURL}
            />
          ))}
        </Grid>
      )}
    </MainLayout>
  );
}
