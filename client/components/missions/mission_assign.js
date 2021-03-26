import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import HUE from "@material-ui/core/colors/blue";
import Button from "@material-ui/core/Button";
import utilStyles from "../../styles/utils.module.css";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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
import { fetchFriendList } from "../../utils/Friends";
import { sendMissionRequest } from "../../utils/Missions";

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

export default function MissionAssign() {
  const classes = useStyles();

  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    fetchFriendList().then((r) => setFriendList(r));
  }, []);

  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedReceiver, setSelectedReceiver] = useState("");
  const handleSelect = ({ target }) => {
    setSelectedReceiver(target.value);
  };

  const handleClick = async () => {
    try {
      const res = await sendMissionRequest(
        subject,
        selectedDate,
        selectedReceiver,
        description
      );
    } catch (err) {
      console.error("Error sending mission request");
    }
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container justify="center" className={classes.gridContainer}>
        <Grid item xs={6}>
          <Typography gutterBottom variant="inherit" component="h3">
            Title:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="off"
            variant="filled"
            //   value={data.username}
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
          <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Date"
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
                format="yyyy/MM/dd"
              />
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </Grid>
      </Grid>

      <Grid container justify="center" className={classes.gridContainer}>
        <Grid item xs={6}>
          <Typography gutterBottom variant="inherit" component="h3">
            Time:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                label="Time"
                placeholder={`${new Date().getHours()}:${new Date().getMinutes()} AM`}
                mask="__:__ _M"
                value={selectedDate}
                onChange={(date) => handleDateChange(date)}
              />
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
        </Grid>
      </Grid>

      <Grid container justify="center" className={classes.gridContainer}>
        <Grid item xs={6}>
          <Typography gutterBottom variant="inherit" component="h3">
            To:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="filled" required>
            <InputLabel id="time-slot-label">Time slot</InputLabel>
            <Select
              labelId="time-slot-label"
              id="demo-simple-select-outlined"
              value={selectedReceiver}
              onChange={handleSelect}
              label="To"
              className={classes.selectEmpty}
            >
              {friendList.map((i, index) => (
                <MenuItem value={i.friend.email} key={index}>
                  {i.friend.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            rowsMax={10}
            aria-label="describe your mission"
            placeholder="Describe your mission here"
            className={classes.textArea}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} className={classes.alignRight}>
        <Button
          variant="contained"
          className={utilStyles.button}
          type="submit"
          className={classes.margin}
        >
          Cancel
        </Button>
        <MuiThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            className={utilStyles.button}
            type="submit"
            onClick={handleClick}
          >
            Send
          </Button>
        </MuiThemeProvider>
      </Grid>
    </Paper>
  );
}
