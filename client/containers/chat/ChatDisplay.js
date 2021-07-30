import Chatbox from "../../components/chat/chatbox";

export default function ChatDisplay({ msgArray }) {
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
