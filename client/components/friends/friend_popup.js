import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import utilStyles from "../../styles/utils.module.css";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import FriendRequestUtil from "../../utils/FriendRequestUtil";
import { appTheme, buttonTheme, progressTheme } from "../../themes/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    backgroundColor: "#f1f1f1",
    width: "100%",
    zIndex: 3,
    top: "10%",
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
}));

export default function FriendPopup({ showPopup, togglePopup }) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const handleChange = ({ target }) => {
    setProgress(false);
    setEmail(target.value);
    setResponseText("");
  };

  const [progress, setProgress] = useState(false);
  const [responseText, setResponseText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.length !== 0) {
        setProgress("start");
        const res = await FriendRequestUtil.sendFriendRequest(email);
        if (res.ok === true) {
          setProgress("success");
          setEmail("");
          setResponseText("");
        } else {
          setProgress("fail");
          setResponseText(await res.text());
        }
      }
    } catch (err) {
      console.error("Error sending friend request");
    }
  };

  return (
    <>
      <div
        className={utilStyles.popup_layer}
        onClick={() => togglePopup(showPopup)}
      ></div>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom className={classes.title}>
            Add Friend
          </Typography>

          <form autoComplete="off" onSubmit={handleSubmit}>
            <MuiThemeProvider theme={appTheme}>
              <TextField
                label="Type user's email"
                variant="filled"
                type="email"
                onChange={handleChange}
                value={email}
              />
            </MuiThemeProvider>
            <br />

            {responseText && (
              <p className={utilStyles.responseText} style={{ color: "red" }}>
                {responseText}
              </p>
            )}

            <CardActions className={classes.alignRight}>
              <MuiThemeProvider theme={buttonTheme}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={
                    progress === "start" || !progress
                      ? null
                      : progress === "success"
                      ? { backgroundColor: "#2cb32c" }
                      : { backgroundColor: "red" }
                  }
                >
                  {progress === "start" || !progress ? "Send request" : null}
                  {progress === "success" && "Request sent"}
                  {progress === "fail" && "Fail to send request"}
                  <MuiThemeProvider theme={progressTheme}>
                    {progress === "start" && <CircularProgress />}
                    {progress === "success" && <CheckIcon />}
                    {progress === "fail" && <CloseIcon />}
                  </MuiThemeProvider>
                </Button>
              </MuiThemeProvider>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
