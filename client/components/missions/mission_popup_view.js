import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import HUE from "@material-ui/core/colors/blue";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import utilStyles from "../../styles/utils.module.css";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchMissionInfo } from "../../utils/Missions";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "1rem",
    width: "90%",
    height: "fit-content",
    maxWidth: 600,
    position: "fixed",
    zIndex: 3,
    top: 0,
  },
  gridContainer: {
    padding: "1rem",
  },
  alignLeft: {
    textAlign: "left",
  },
  alignRight: {
    textAlign: "right",
    margin: "1rem",
  },
  closeButton: {
    textAlign: "right",
  },
  textArea: {
    padding: "0.5rem",
    resize: "none",
    width: "90%",
    fontSize: 14,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  margin: {
    margin: "0.8rem",
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "#fff" },
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
    fetchMissionInfo(requestId).then((r) => setMissionInfo(r));
  }, []);

  return (
    <>
      <div
        className={utilStyles.popup_layer}
        onClick={() => toggleMissionPopupView()}
      ></div>
      <Paper elevation={3} className={classes.paper}>
        {missionInfo && (
          <>
            <Grid container justify="center" className={classes.gridContainer}>
              <Grid item xs={12} className={classes.closeButton}>
                <IconButton
                  aria-label="close"
                  onClick={() => toggleMissionPopupView()}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>

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
                  multiline
                  rowsMax={3}
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
                  value={new Date(missionInfo.due_date).toLocaleTimeString()}
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
                  Send to:
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

            <Grid container justify="center" className={classes.gridContainer}>
              <Grid item xs={6}>
                <Typography gutterBottom variant="inherit" component="h3">
                  Description:
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.alignLeft}>
                <TextField
                  id="description"
                  name="description"
                  aria-label="description"
                  rowsMax={3}
                  className={classes.textArea}
                  value={missionInfo.description}
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                />
              </Grid>
            </Grid>

            {fromPage === "notifications" ? (
              <Grid item xs={12} className={classes.alignRight}>
                <Button
                  variant="contained"
                  className={utilStyles.button}
                  className={classes.margin}
                  onClick={() => onClickAction("reject", requestId)}
                >
                  <b>Reject</b>
                </Button>
                <MuiThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={utilStyles.button}
                    onClick={() => onClickAction("accept", requestId)}
                  >
                    <b>Accept</b>
                  </Button>
                </MuiThemeProvider>
              </Grid>
            ) : null}
          </>
        )}

        {!missionInfo && (
          <MuiThemeProvider theme={theme}>
            <CircularProgress style={{ marginTop: "50%" }} />
          </MuiThemeProvider>
        )}
      </Paper>
    </>
  );
}
