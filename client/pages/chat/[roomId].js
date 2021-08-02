import MainLayout from "../../containers/main_layout";
import Spinner from "../../components/spinner";
import ChatDisplay from "../../containers/chat/ChatDisplay";
import SendBar from "../../components/chat/send_bar";
import utilStyles from "../../styles/utils.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  loadChatRoomTitleAsync,
  selectChatIsLoading,
  selectChatRoomTitle,
} from "../../features/chatSlice";

export default function ChatRoom({}) {
  const dispatch = useDispatch();

  const router = useRouter();
  const { roomId } = router.query;

  const isLoading = useSelector(selectChatIsLoading);
  const chatRoomTitle = useSelector(selectChatRoomTitle);
  const [demoArr, setDemoArr] = useState([]);
  useEffect(() => {
    if (roomId) {
      dispatch({
        type: "chat/subscribe",
        payload: roomId,
      });
      dispatch(loadChatRoomTitleAsync(roomId));

      // FIXME: dispatch(loadChatRoomMessages(roomId)) here
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
    }
  }, [roomId]);

  useEffect(() => {
    document.querySelector("#chat-display").scrollTop =
      document.querySelector("#chat-display").scrollHeight;
  }, [isLoading]);

  return (
    <MainLayout componentName="Chat" roomTitle={roomId ? chatRoomTitle : ""}>
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
