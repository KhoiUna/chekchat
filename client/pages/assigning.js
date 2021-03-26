import MainLayout from "../containers/main_layout";
import MissionRequest from "../components/missions/mission_request";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import HUE from "@material-ui/core/colors/blue";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import MissionAssign from "../components/missions/mission_assign";

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    position: "fixed",
    bottom: "1rem",
    right: "0.8rem",
    zIndex: 1,
  },
  badge: {
    margin: "0.8rem 0",
  },
  alignLeft: {
    textAlign: "left",
    margin: "0.4rem 0 0.5rem 1rem",
  },
}));

const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "white" },
  },
});

export default function Assigning() {
  const classes = useStyles();

  const [sentMissionList, setSentMissionList] = useState([]);
  useEffect(() => {
    setSentMissionList([
      {
        subject: "Logo design",
        due_date: new Date(),
        from: { username: "Holder holderabc", avatarURL: "/img/avatar.png" },
        to: { username: "Holder holder", avatarURL: "/img/avatar.png" },
        description: "",
        status: "Pending",
      },
      {
        subject: "Logo design",
        due_date: new Date(),
        from: { username: "Holder holderabc", avatarURL: "/img/avatar.png" },
        to: { username: "Holder holder", avatarURL: "/img/avatar.png" },
        description: "",
        status: "Pending",
      },
      {
        subject: "Logo design",
        due_date: new Date(),
        from: { username: "Holder holderabc", avatarURL: "/img/avatar.png" },
        to: { username: "Holder holder", avatarURL: "/img/avatar.png" },
        description: "",
        status: "Pending",
      },
      {
        subject: "Logo design",
        due_date: new Date(),
        from: { username: "Holder holderabc", avatarURL: "/img/avatar.png" },
        to: { username: "Holder holder", avatarURL: "/img/avatar.png" },
        description: "",
        status: "Pending",
      },
      {
        subject: "Logo design",
        due_date: new Date(),
        from: { username: "Holder holderabc", avatarURL: "/img/avatar.png" },
        to: { username: "Holder holder", avatarURL: "/img/avatar.png" },
        description: "",
        status: "Pending",
      },
      {
        subject: "Logo design",
        due_date: new Date(),
        from: { username: "Holder holderabc", avatarURL: "/img/avatar.png" },
        to: { username: "Holder holder", avatarURL: "/img/avatar.png" },
        description: "",
        status: "Pending",
      },
    ]);
  }, []);

  const [missionAssign, setMissionAssign] = useState(false);
  const toggleMissionAssign = () => setMissionAssign(!missionAssign);

  return (
    <MainLayout componentName="Assigning">
      {!missionAssign && (
        <>
          <Typography
            gutterBottom
            variant="inherit"
            component="h2"
            className={classes.alignLeft}
          >
            Sent mission:
          </Typography>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {sentMissionList.map((i) => (
              <MissionRequest
                status={i.status}
                username={i.from.username}
                subject={i.subject}
                avatarURL={i.from.avatarURL}
              />
            ))}
          </Grid>

          <MuiThemeProvider theme={buttonTheme}>
            <Fab
              color="primary"
              aria-label="assign mission"
              variant="extended"
              className={classes.button}
              onClick={toggleMissionAssign}
            >
              <AddIcon className={classes.extendedIcon} />
              Assign
            </Fab>
          </MuiThemeProvider>
        </>
      )}

      {missionAssign && <MissionAssign />}
    </MainLayout>
  );
}
