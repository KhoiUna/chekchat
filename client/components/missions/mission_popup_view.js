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
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import utilStyles from "../../styles/utils.module.css";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { fetchMissionInfo } from "../../utils/Missions";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "1rem",
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
}) {
  const classes = useStyles();

  const [missionInfo, setMissionInfo] = useState({});
  useEffect(() => {
    fetchMissionInfo(requestId).then((r) => {
      setMissionInfo(r);
    });
  }, [requestId]);

  const handleClick = () => {
    //
  };
  console.log(missionInfo);
  return (
    <Paper elevation={3} className={classes.paper}>
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
            value={missionInfo.due_date}
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
          <TextareaAutosize
            rowsMin={3}
            rowsMax={10}
            aria-label="describe your mission"
            placeholder="Describe your mission here"
            className={classes.textArea}
            value={missionInfo.description}
            disabled
          />
        </Grid>
      </Grid>

      <Grid item xs={12} className={classes.alignRight}>
        <Button
          variant="contained"
          className={utilStyles.button}
          type="submit"
          className={classes.margin}
          onClick={handleClick}
        >
          Refuse
        </Button>
        <MuiThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            className={utilStyles.button}
            type="submit"
            onClick={handleClick}
          >
            Accept
          </Button>
        </MuiThemeProvider>
      </Grid>
    </Paper>
  );
}
