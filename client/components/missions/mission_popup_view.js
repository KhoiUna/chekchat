import {
  makeStyles,
  MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { useEffect, useState, forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import utilStyles from "../../styles/utils.module.css";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MissionsUtil from "../../utils/MissionsUtil";
import Spinner from "../spinner";
import FormatDatetime from "../../helpers/FormatDatetime";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import { buttonTheme } from "../../themes/theme";
import Link from "next/link";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "1rem",
  },
  alignRight: {
    textAlign: "right",
    margin: "1rem",
  },
  textArea: {
    resize: "none",
    fontSize: 14,
  },
  margin: {
    margin: "0.8rem",
  },
}));

const theme = createTheme({
  overrides: {
    MuiFormControl: {
      root: {
        width: "100%",
      },
    },
    MuiInput: {
      root: {
        width: "100%",
      },
    },
  },
});

export default function MissionPopupView({
  requestId,
  toggleMissionPopupView,
  fromPage,
  onClickAction,
  status,
  chatroomId,
}) {
  const classes = useStyles();

  const [missionInfo, setMissionInfo] = useState(null);
  useEffect(() => {
    MissionsUtil.fetchMissionInfo(requestId)
      .then((r) => setMissionInfo(r))
      .catch((err) => console.error("Error fetching mission info"));
  }, []);

  return (
    <MuiThemeProvider theme={{ ...theme, ...buttonTheme }}>
      <Dialog
        fullScreen
        open={true}
        onClose={toggleMissionPopupView}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar style={{ margin: 0 }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleMissionPopupView}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5">Task view</Typography>
          </Toolbar>
        </AppBar>

        {missionInfo && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            style={{ marginTop: "4rem" }}
          >
            <Grid
              container
              justifyContent="center"
              className={classes.gridContainer}
            >
              <Grid item xs={6}>
                <Typography gutterBottom variant="inherit" component="h3">
                  Subject:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="subject"
                  name="subject"
                  value={missionInfo.subject}
                  InputProps={{
                    readOnly: true,
                  }}
                  maxRows={5}
                  multiline
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="center"
              className={classes.gridContainer}
            >
              <Grid item xs={6}>
                <Typography gutterBottom variant="inherit" component="h3">
                  Due date:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="due_date"
                  value={new Date(missionInfo.due_date).toLocaleDateString()}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="center"
              className={classes.gridContainer}
            >
              <Grid item xs={6}>
                <Typography gutterBottom variant="inherit" component="h3">
                  Time:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="time"
                  value={FormatDatetime.forTodoAndMissions(
                    missionInfo.due_date
                  )}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="center"
              className={classes.gridContainer}
            >
              <Grid item xs={6}>
                <Typography gutterBottom variant="inherit" component="h3">
                  From:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="sender"
                  value={missionInfo.from_user[0].username}
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  maxRows={3}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="center"
              className={classes.gridContainer}
            >
              <Grid item xs={6}>
                <Typography gutterBottom variant="inherit" component="h3">
                  To:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="receiver"
                  value={missionInfo.to_user[0].username}
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  maxRows={3}
                />
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="flex-start"
              className={classes.gridContainer}
            >
              <Grid item xs={6}>
                <Typography gutterBottom variant="inherit" component="h3">
                  Description:
                </Typography>
              </Grid>

              <TextField
                id="description"
                name="description"
                aria-label="description"
                className={classes.textArea}
                value={missionInfo.description}
                InputProps={{
                  readOnly: true,
                }}
                maxRows={15}
                multiline
              />
            </Grid>
          </Grid>
        )}

        {missionInfo && fromPage === "inbox" && (
          <div className={classes.alignRight}>
            <Button
              variant="contained"
              className={utilStyles.button}
              className={classes.margin}
              onClick={() => {
                onClickAction("reject", requestId);
                toggleMissionPopupView();
              }}
            >
              <b>Reject</b>
            </Button>
            <MuiThemeProvider theme={buttonTheme}>
              <Button
                variant="contained"
                color="primary"
                className={utilStyles.button}
                onClick={() => {
                  onClickAction("accept", requestId);
                  toggleMissionPopupView();
                }}
              >
                <b>Accept</b>
              </Button>
            </MuiThemeProvider>
          </div>
        )}

        {missionInfo &&
          (fromPage === "send" || fromPage === "todo") &&
          status === "Accepted" && (
            <div className={classes.alignRight}>
              <MuiThemeProvider theme={buttonTheme}>
                <Link href={`/chat/${missionInfo.chatroomId}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={utilStyles.button}
                  >
                    <b>Go to task chat</b>
                  </Button>
                </Link>
              </MuiThemeProvider>
            </div>
          )}

        {!missionInfo && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "4rem" }}
          >
            <Spinner />
          </Grid>
        )}
      </Dialog>
    </MuiThemeProvider>
  );
}
