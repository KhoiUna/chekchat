import Chatbox from "../../components/chat/chatbox";
import Typography from "@material-ui/core/Typography";

export default function ChatDisplay({ msgArray }) {
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
    return (
      <Chatbox
        key={index}
        from_user={i.from_user}
        message={i.message}
        sent_datetime={i.sent_datetime}
      />
    );
  });
}
