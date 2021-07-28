import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { useEffect, useState, forwardRef } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import utilStyles from "../../styles/utils.module.css";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FriendsUtil from "../../utils/FriendsUtil";
import MissionsUtil from "../../utils/MissionsUtil";
import { appTheme, buttonTheme, progressTheme } from "../../themes/theme";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "1rem",
    width: "90%",
    maxWidth: 600,
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
    fontSize: 14,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  margin: {
    margin: "0.8rem",
  },
  closeButton: {
    textAlign: "right",
  },
}));

export default function MissionAssign({ toggleMissionAssign }) {
  const classes = useStyles();

  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    FriendsUtil.fetchFriendList()
      .then((r) => setFriendList(r))
      .catch((err) =>
        console.error("Error fetching friend list for selections")
      );
  }, []);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState("");
  const handleSelect = ({ target }) => {
    setSelectedReceiver(target.value);
  };

  const [subject, setSubject] = useState("");
  const handleChangeSubject = ({ target }) => {
    setSubject(target.value);
  };

  const [description, setDescription] = useState("");
  const handleChangeDescription = ({ target }) => {
    setDescription(target.value);
  };

  const [progress, setProgress] = useState(false);
  const handleClick = async () => {
    try {
      setProgress("start");
      const res = await MissionsUtil.sendMissionRequest(
        subject,
        selectedDate,
        selectedReceiver,
        description
      );
      if (res.ok === true) {
        toggleMissionAssign();
      } else {
        setProgress("fail");
      }
    } catch (err) {
      console.error("Error sending mission request");
    }
  };

  return (
    <MuiThemeProvider theme={buttonTheme}>
      <Dialog
        fullScreen
        open={true}
        onClose={toggleMissionAssign}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar style={{ margin: 0 }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleMissionAssign}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5">Send task</Typography>
          </Toolbar>
        </AppBar>

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
                required
                id="subject"
                name="subject"
                label="Subject"
                fullWidth
                autoComplete="off"
                variant="filled"
                value={subject}
                onChange={handleChangeSubject}
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
              <MuiThemeProvider theme={{ ...appTheme, ...buttonTheme }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label="Date"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    format="yyyy/MM/dd"
                  />
                </MuiPickersUtilsProvider>
              </MuiThemeProvider>
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
              <MuiThemeProvider theme={{ ...appTheme, ...buttonTheme }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    label="Time"
                    placeholder={`${new Date().getHours()}:${new Date().getMinutes()} AM`}
                    mask="__:__ _M"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                </MuiPickersUtilsProvider>
              </MuiThemeProvider>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center"
            className={classes.gridContainer}
          >
            <Grid item xs={6}>
              <Typography gutterBottom variant="inherit" component="h3">
                Send to:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="filled" required>
                <InputLabel id="receiver-label">Receiver</InputLabel>
                <Select
                  labelId="receiver-label"
                  id="receiver-select"
                  value={selectedReceiver}
                  onChange={handleSelect}
                  label="To"
                  className={classes.selectEmpty}
                >
                  {friendList.map((i, index) => (
                    <MenuItem value={i.friend[0].email} key={index}>
                      {i.friend[0].username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center"
            className={classes.gridContainer}
          >
            <Grid item xs={6}>
              <Typography gutterBottom variant="inherit" component="h3">
                Description:
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.alignLeft}>
              <TextField
                id="filled-textarea"
                label="Task description"
                name="task description"
                multiline
                rowsmin={3}
                maxRows={10}
                aria-label="describe your task"
                placeholder="Describe your task here"
                variant="filled"
                className={classes.textArea}
                onChange={handleChangeDescription}
                value={description}
                required
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center">
            <Grid item xs={12} className={classes.alignRight}>
              <Button
                variant="contained"
                className={utilStyles.button}
                type="submit"
                className={classes.margin}
                onClick={toggleMissionAssign}
              >
                Cancel
              </Button>
              <MuiThemeProvider theme={{ ...appTheme, ...buttonTheme }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={utilStyles.button}
                  type="submit"
                  onClick={handleClick}
                  style={
                    progress === "start" || !progress
                      ? null
                      : progress === "fail"
                      ? { backgroundColor: "red" }
                      : null
                  }
                >
                  {progress === "start" || !progress ? "Send" : null}
                  {progress === "fail" && "Invalid data"}
                  <MuiThemeProvider theme={progressTheme}>
                    {progress === "start" && <CircularProgress />}
                    {progress === "fail" && <CloseIcon />}
                  </MuiThemeProvider>
                </Button>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </MuiThemeProvider>
  );
}
