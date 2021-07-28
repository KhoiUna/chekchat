import SendIcon from "@material-ui/icons/Send";
import utilStyles from "../../styles/utils.module.css";
import Fab from "@material-ui/core/Fab";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { buttonTheme } from "../../themes/theme";

const useStyles = makeStyles({
  button: {
    margin: "auto",
  },
});

export default function SendBar({}) {
  const classes = useStyles();
  return (
    <div className={utilStyles.send_bar}>
      <div
        className={utilStyles.send_form}
        placeholder="Type message"
        contentEditable={true}
      ></div>

      <MuiThemeProvider theme={buttonTheme}>
        <Fab
          color="primary"
          aria-label="Send message"
          className={classes.button}
        >
          <SendIcon style={{ fontSize: "2rem" }} />
        </Fab>
      </MuiThemeProvider>
    </div>
  );
}
