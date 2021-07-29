import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import utilStyles from "../../styles/utils.module.css";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { buttonTheme } from "../../themes/theme";

const useStyles = makeStyles({
  button: {
    margin: "0 auto auto auto",
    padding: "0.4rem",
  },
});

export default function SendBar({}) {
  const classes = useStyles();
  return (
    <div className={utilStyles.send_bar}>
      <div className={utilStyles.send_area}>
        <div
          className={utilStyles.send_form}
          placeholder="Type message"
          contentEditable={true}
        ></div>

        <MuiThemeProvider theme={buttonTheme}>
          <IconButton
            color="primary"
            aria-label="Send message"
            className={classes.button}
          >
            <SendIcon style={{ fontSize: "2rem" }} />
          </IconButton>
        </MuiThemeProvider>
      </div>
    </div>
  );
}
