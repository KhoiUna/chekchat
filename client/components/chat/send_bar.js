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

  const handleKeyPress = (e) => {
    const { target } = e;

    if (e.which === 13 && target.innerText.trim().length !== 0) {
      if (!e.shiftKey) {
        e.preventDefault();
        // const socketMsgObj = {
        //   user: { username, avatarURL },
        //   msg: target.innerText,
        //   time: Date.now(),
        // };
        // socket.emit("chat message", socketMsgObj);
        target.innerText = "";
      } else if (e.shiftKey) {
        //Allow shift + Enter
        target.style.bottom += "3vh";
      }
    } else if (e.which === 13 && target.innerText.trim().length === 0) {
      if (!e.shiftKey) {
        e.preventDefault();
      } else if (e.shiftKey) {
        //Allow shift + Enter
        target.style.bottom += "3vh";
      }
    }
  };

  const handleClick = (e) => {
    if (document.getElementById("msg").innerText.trim().length !== 0) {
      // const socketMsgObj = {
      //   user: { username, avatarURL },
      //   msg: document.getElementById("msg").innerText,
      //   time: Date.now(),
      // };
      // socket.emit("chat message", socketMsgObj);
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
