import MainLayout from "../../containers/main_layout";
import Spinner from "../../components/spinner";
import ChatDisplay from "../../containers/chat/ChatDisplay";
import SendBar from "../../components/chat/send_bar";
import utilStyles from "../../styles/utils.module.css";
import { useEffect } from "react";

const arr = new Array(20).fill({
  from_user: {
    username: "John Doe",
    avatarURL: "/chekchat_upload/user_avatar_qTUoDmgcE.png",
  },
  message:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.\nAhahahihi ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
  sent_datetime: new Date(),
});

export default function ChatRoom({}) {
  const isLoading = false;

  useEffect(() => {
    document.querySelector("#chat-display").scrollTop =
      document.querySelector("#chat-display").scrollHeight;
  });

  return (
    <MainLayout componentName="Chat" roomTitle="Room Title">
      <div className={utilStyles.chat_area}>
        <div className={utilStyles.chat_display} id="chat-display">
          {isLoading ? (
            <div style={{ marginTop: "1rem" }}>
              <Spinner />
            </div>
          ) : (
            <ChatDisplay msgArray={arr} />
          )}
        </div>

        <SendBar />
      </div>
    </MainLayout>
  );
}
