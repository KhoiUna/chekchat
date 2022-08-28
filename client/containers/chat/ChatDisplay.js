import Chatbox from "../../components/chat/chatbox";
import Typography from "@material-ui/core/Typography";
import FormatDatetime from "../../helpers/FormatDatetime";
import utilStyles from "../../styles/utils.module.css";
import { useEffect, useRef, Fragment } from "react";

const DateDivider = ({ time }) => (
  <div className={utilStyles.datedivider_container}>
    <div className={utilStyles.datedivider_info}>
      <Typography variant="subtitle1" gutterBottom style={{ margin: 0 }}>
        <b>{FormatDatetime.forDateDivider(time)}</b>
      </Typography>
    </div>
  </div>
);

export default function ChatDisplay({ msgArray }) {
  let repeatedDate;
  let renderDateDivider;

  const scrollTopForChatArea = useRef(0);
  useEffect(() => {
    document.getElementById("chat-display").scrollTop =
      document.getElementById("chat-display").scrollHeight -
      scrollTopForChatArea.current -
      50;

    scrollTopForChatArea.current =
      document.getElementById("chat-display").scrollHeight;
  }, [msgArray]);

  if (msgArray.length === 0) {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginTop: "10%" }}
        component="p"
      >
        <i>Start filling your conversation with productivity!</i>
      </Typography>
    );
  }

  return msgArray.map((i, index) => {
    if (new Date(i.sent_datetime).toDateString() !== repeatedDate) {
      repeatedDate = new Date(i.sent_datetime).toDateString();
      renderDateDivider = true;
    } else {
      renderDateDivider = false;
    }

    return (
      <>
        {renderDateDivider && (
          <DateDivider key={index} time={i.sent_datetime} />
        )}

        <Chatbox
          key={i._id}
          from_user={i.from_user}
          message={i.message}
          sent_datetime={i.sent_datetime}
        />
      </>
    );
  });
}
