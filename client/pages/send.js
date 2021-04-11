import MainLayout from "../containers/main_layout";
import MissionRequest from "../components/missions/mission_request";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
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
import { fetchMissionRequestsList } from "../utils/Missions";
import Spinner from "../components/spinner";
import FilterButton from "../components/send/filter_button";

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

  const [missionAssign, setMissionAssign] = useState(false);
  const toggleMissionAssign = () => setMissionAssign(!missionAssign);

  const [sentMissionList, setSentMissionList] = useState(null);
  const [filteredSentMissionList, setFilteredSentMissionList] = useState(null);
  useEffect(() => {
    if (!missionAssign)
      fetchMissionRequestsList("from").then((r) => {
        setSentMissionList(r);
        setFilteredSentMissionList(r);
      });
  }, [missionAssign]);

  const filterSentMissionList = (status) => {
    if (status === "None") return setFilteredSentMissionList(sentMissionList);

    const filteredList = sentMissionList.filter((i) => i.status === status);
    setFilteredSentMissionList(filteredList);
  };

  return (
    <MainLayout componentName="Send tasks">
      {!missionAssign && (
        <>
          <Typography
            gutterBottom
            variant="inherit"
            component="h2"
            className={classes.alignLeft}
          >
            Tasks sent:
          </Typography>

          <FilterButton filterSentMissionList={filterSentMissionList} />

          {sentMissionList?.length === 0 && (
            <>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ marginTop: "10%" }}
              >
                <i>You have no tasks sent yet!</i>
              </Typography>
              <Typography
                variant="p"
                color="textSecondary"
                style={{ margin: "1rem" }}
                component="p"
              >
                Click the send button
                <div
                  style={{
                    color: "#0000008a",
                    display: "inline",
                    margin: "0 0.5rem",
                    fontSize: "2rem",
                  }}
                >
                  <SendIcon />
                </div>
                to send your first task!
              </Typography>
            </>
          )}

          {filteredSentMissionList ? (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ marginBottom: "4rem" }}
            >
              {filteredSentMissionList.map((i) => (
                <MissionRequest
                  status={i.status}
                  username={i.to.username}
                  subject={i.subject}
                  requestId={i._id}
                  sent_date={i.sent_date}
                />
              ))}
            </Grid>
          ) : (
            <Spinner />
          )}

          <MuiThemeProvider theme={buttonTheme}>
            <Fab
              color="primary"
              aria-label="send mission"
              className={classes.button}
              onClick={toggleMissionAssign}
            >
              <SendIcon style={{ fontSize: "2rem" }} />
            </Fab>
          </MuiThemeProvider>
        </>
      )}

      {missionAssign && (
        <MissionAssign toggleMissionAssign={toggleMissionAssign} />
      )}
    </MainLayout>
  );
}
