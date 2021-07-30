import MainLayout from "../../containers/main_layout";
import Spinner from "../../components/spinner";
import ChatArea from "../../containers/chat/ChatArea";
import SendBar from "../../components/chat/send_bar";
import utilStyles from "../../styles/utils.module.css";

const arr = new Array(50).fill({
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

  return (
    <MainLayout componentName="Chat" roomTitle="Room Title">
      <div className={utilStyles.chat_area}>
        <div className={utilStyles.chat_display}>
          {isLoading ? (
            <div style={{ marginTop: "1rem" }}>
              <Spinner />
            </div>
          ) : (
            <ChatArea msgArray={arr} />
          )}
        </div>

        <SendBar />
      </div>
    </MainLayout>
  );
}
