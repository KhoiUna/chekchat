import MainLayout from "../../containers/main_layout";
import Spinner from "../../components/spinner";
import ChatDisplay from "../../containers/chat/ChatDisplay";
import SendBar from "../../components/chat/send_bar";
import utilStyles from "../../styles/utils.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ChatUtil from "../../utils/ChatUtil";

export default function ChatRoom({}) {
  const [isLoading, setIsLoading] = useState(true);
  const [roomTitle, setRoomTitle] = useState("");

  const [demoArr, setDemoArr] = useState([]);

  const router = useRouter();
  const roomId = router.query?.roomId;

  useEffect(() => {
    if (roomId) {
      ChatUtil.fetchChatRoomTitle(roomId).then((r) => {
        setRoomTitle(r);
        setIsLoading(false);

        setDemoArr(
          new Array(20).fill({
            from_user: {
              username: "John Doe",
              avatarURL: "/chekchat_upload/user_avatar_qTUoDmgcE.png",
            },
            message:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.\nAhahahihi ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.",
            sent_datetime: new Date(),
          })
        );

        document.querySelector("#chat-display").scrollTop =
          document.querySelector("#chat-display").scrollHeight;
      });
    }
  }, [roomId]);

  return (
    <MainLayout componentName="Chat" roomTitle={roomId ? roomTitle : ""}>
      <div className={utilStyles.chat_area}>
        <div className={utilStyles.chat_display} id="chat-display">
          {isLoading ? (
            <div style={{ marginTop: "1rem" }}>
              <Spinner />
            </div>
          ) : (
            <ChatDisplay msgArray={demoArr} />
          )}
        </div>

        <SendBar />
      </div>
    </MainLayout>
  );
}
