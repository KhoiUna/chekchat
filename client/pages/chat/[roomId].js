import MainLayout from "../../containers/main_layout";
import Spinner from "../../components/spinner";
import ChatArea from "../../containers/chat/ChatArea";
import SendBar from "../../components/chat/send_bar";
import utilStyles from "../../styles/utils.module.css";

const arr = new Array(3).fill({
  from_user: {
    username: "John Doe",
    avatarURL: "/chekchat_upload/user_avatar_qTUoDmgcE.png",
  },
  message: "placeholder",
  sent_datetime: new Date().toLocaleString(),
});

export default function ChatRoom({}) {
  const isLoading = false;

  return (
    <MainLayout componentName="Chat">
      <div>
        <div style={{ backgroundColor: "yellow" }}>
          {isLoading ? <Spinner /> : <ChatArea msgArray={arr} />}
        </div>

        <SendBar />
      </div>
    </MainLayout>
  );
}
