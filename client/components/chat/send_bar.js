import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import utilStyles from "../../styles/utils.module.css";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { buttonTheme } from "../../themes/theme";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  button: {
    margin: "0 auto auto auto",
    padding: "0.4rem",
  },
});

export default function SendBar({}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    const { target } = e;

    if (e.which === 13 && target.innerText.trim().length !== 0) {
      if (!e.shiftKey) {
        e.preventDefault();

        dispatch({
          type: "chat/chatMessage",
          payload: {
            sent_datetime: new Date().toUTCString(),
            message: target.innerText,
          },
        });

        target.innerText = "";
      } else if (e.shiftKey) {
        //Allow shift + Enter to make new line
        target.style.bottom += "3vh";
      }
    } else if (e.which === 13 && target.innerText.trim().length === 0) {
      if (!e.shiftKey) {
        e.preventDefault();
      } else if (e.shiftKey) {
        //Allow shift + Enter to make new line
        target.style.bottom += "3vh";
      }
    }
  };

  const handleClick = (e) => {
    if (document.getElementById("msg").innerText.trim().length !== 0) {
      dispatch({
        type: "chat/chatMessage",
        payload: {
          sent_datetime: new Date().toUTCString(),
          message: document.getElementById("msg").innerText,
        },
      });

      document.getElementById("msg").innerText = "";
    }
  };

  return (
    <div className={utilStyles.send_bar}>
      <div className={utilStyles.send_area}>
        <div
          id="msg"
          className={utilStyles.send_form}
          placeholder="Type message here"
          contentEditable={true}
          autoCorrect="off"
          spellCheck={false}
          aria-label="Type message here"
          aria-multiline={true}
          role="textbox"
          data-gramm={false}
          data-slate-editor={true}
          data-can-focus={true}
          data-key={0}
          onKeyPress={handleKeyPress}
        ></div>

        <MuiThemeProvider theme={buttonTheme}>
          <IconButton
            color="primary"
            aria-label="Send message"
            className={classes.button}
            onClick={handleClick}
          >
            <SendIcon style={{ fontSize: "2rem" }} />
          </IconButton>
        </MuiThemeProvider>
      </div>
    </div>
  );
}
