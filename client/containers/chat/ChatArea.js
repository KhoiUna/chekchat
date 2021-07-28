import Chatbox from "../../components/chat/chatbox";

export default function ChatArea({ msgArray }) {
  return msgArray.map((i) => {
    return (
      <Chatbox
        from_user={i.from_user}
        message={i.message}
        sent_datetime={i.sent_datetime}
      />
    );
  });
}
