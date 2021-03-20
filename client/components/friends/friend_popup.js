import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
  withTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import utilStyles from "../../styles/utils.module.css";
import TextField from "@material-ui/core/TextField";
import HUE from "@material-ui/core/colors/blue";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    backgroundColor: "#f1f1f1",
    width: "100%",
  },
  cardContent: {
    padding: "1% 0",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  alignRight: {
    float: "right",
    marginTop: "1rem",
  },
  progress: {
    color: "white",
  },
}));

const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "white" },
  },
});
const progressTheme = createMuiTheme({
  overrides: {
    MuiCircularProgress: {
      root: {
        width: "1rem !important",
        height: "1rem !important",
        marginLeft: "1rem",
      },
      svg: {
        color: "white",
      },
    },
  },
});
const theme = createMuiTheme({
  palette: {
    primary: { main: HUE[700], contrastText: HUE[700] },
  },
});

export default function FriendPopup({ showPopup, togglePopup }) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setProgress("start");
    setTimeout(() => {
      setProgress("success");
      setEmail("");
    }, 1000);
  };
  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  return (
    <>
      <div
        className={utilStyles.popup_layer}
        onClick={() => togglePopup(showPopup)}
      ></div>
      <div className={utilStyles.popup_container}>
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom className={classes.title}>
              Add Friend
            </Typography>

            <form autoComplete="off" onSubmit={handleSubmit}>
              <MuiThemeProvider theme={theme}>
                <TextField
                  label="Type user's email"
                  variant="filled"
                  type="email"
                  onChange={handleChange}
                  value={email}
                />
              </MuiThemeProvider>
              <br />
              <CardActions className={classes.alignRight}>
                <MuiThemeProvider theme={buttonTheme}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={
                      progress === "success"
                        ? { backgroundColor: "#2cb32c" }
                        : null
                    }
                  >
                    {progress === "success" ? "Request sent" : "Send request"}
                    <MuiThemeProvider theme={progressTheme}>
                      {progress === "start" && <CircularProgress />}
                      {progress === "success" && <CheckIcon />}
                    </MuiThemeProvider>
                  </Button>
                </MuiThemeProvider>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
