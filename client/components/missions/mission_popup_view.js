import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { useEffect, useState, forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import HUE from "@material-ui/core/colors/blue";
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

const theme = createMuiTheme({
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
}) {
  const classes = useStyles();

  const [missionInfo, setMissionInfo] = useState(null);
  useEffect(() => {
    MissionsUtil.fetchMissionInfo(requestId).then((r) => setMissionInfo(r));
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Dialog
        fullScreen
        open={open}
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
            justify="center"
            alignItems="flex-start"
            style={{ marginTop: "4rem" }}
          >
            <Grid container justify="center" className={classes.gridContainer}>
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
                  rowsMax={5}
                  multiline
                />
              </Grid>
            </Grid>

            <Grid container justify="center" className={classes.gridContainer}>
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

            <Grid container justify="center" className={classes.gridContainer}>
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

            <Grid container justify="center" className={classes.gridContainer}>
              <Grid item xs={6}>
                <Typography gutterBottom variant="inherit" component="h3">
                  From:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="sender"
                  value={missionInfo.from?.username}
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  rowsMax={3}
                />
              </Grid>
            </Grid>

            <Grid container justify="center" className={classes.gridContainer}>
              <Grid item xs={6}>
                <Typography gutterBottom variant="inherit" component="h3">
                  To:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="receiver"
                  value={missionInfo.to?.username}
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  rowsMax={3}
                />
              </Grid>
            </Grid>

            <Grid container justify="left" className={classes.gridContainer}>
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
                rowsMax={15}
                multiline
              />
            </Grid>
          </Grid>
        )}

        {missionInfo && fromPage === "inbox" ? (
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
        ) : null}

        {!missionInfo && (
          <Grid
            container
            direction="column"
            justify="center"
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
