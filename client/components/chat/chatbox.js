import Image from "next/image";
import imageLoader from "../../helpers/imageLoader";
import utilStyles from "../../styles/utils.module.css";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormatDatetime from "../../helpers/FormatDatetime";

const useStyles = makeStyles({
  chat_username: {
    fontWeight: "bold",
  },
  chat_sent_datetime: {
    marginLeft: "0.3rem",
    color: "#737373",
  },
  chat_message: {
    whiteSpace: "pre-line",
  },
});

export default function Chatbox({ from_user, message, sent_datetime }) {
  const classes = useStyles();

  return (
    <div className={utilStyles.chatbox}>
      <div className={utilStyles.chat_avatar}>
        <Image
          loader={imageLoader}
          src={from_user[0].avatarURL}
          priority
          height={50}
          width={50}
          alt={from_user[0].username}
        />
      </div>

      <div className={utilStyles.chat_container}>
        <div className={utilStyles.chat_info}>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.chat_username}
          >
            {from_user[0].username}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            className={classes.chat_sent_datetime}
          >
            {FormatDatetime.forChatbox(sent_datetime)}
          </Typography>
        </div>

        <Typography
          variant="body1"
          gutterBottom
          className={classes.chat_message}
        >
          {message}
        </Typography>
      </div>
    </div>
  );
}
