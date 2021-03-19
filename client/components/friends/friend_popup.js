import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import utilStyles from "../../styles/utils.module.css";
import TextField from "@material-ui/core/TextField";
import HUE from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    backgroundColor: "#f1f1f1",
    width: "100%",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  alignRight: {
    float: "right",
  },
}));

const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "white" },
  },
});

export default function FriendPopup() {
  const classes = useStyles();

  return (
    <div className={utilStyles.popup_layer}>
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom className={classes.title}>
            Add Friend
          </Typography>

          <form noValidate autoComplete="off">
            <TextField label="Type user's email" variant="filled" />
          </form>
        </CardContent>

        <CardActions className={classes.alignRight}>
          <MuiThemeProvider theme={buttonTheme}>
            <Button variant="contained" color="primary">
              Send request
            </Button>
          </MuiThemeProvider>
        </CardActions>
      </Card>
    </div>
  );
}
