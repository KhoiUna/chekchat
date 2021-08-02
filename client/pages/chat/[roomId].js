import MainLayout from "../../containers/main_layout";
import Spinner from "../../components/spinner";
import ChatDisplay from "../../containers/chat/ChatDisplay";
import SendBar from "../../components/chat/send_bar";
import utilStyles from "../../styles/utils.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  loadChatRoomTitleAsync,
  loadChatMessagesAsync,
  selectChatIsLoading,
  selectChatRoomTitle,
  selectChatMessages,
} from "../../features/chatSlice";

export default function ChatRoom({}) {
  const dispatch = useDispatch();

  const router = useRouter();
  const { roomId } = router.query;

  const isLoading = useSelector(selectChatIsLoading);
  const chatRoomTitle = useSelector(selectChatRoomTitle);
  const chatMessages = useSelector(selectChatMessages);
  useEffect(() => {
    if (roomId) {
      dispatch({
        type: "chat/subscribe",
        payload: roomId,
      });

      dispatch(loadChatRoomTitleAsync(roomId));

      dispatch(loadChatMessagesAsync(roomId));
    }
  }, [roomId]);

  useEffect(() => {
    document.querySelector("#chat-display").scrollTop =
      document.querySelector("#chat-display").scrollHeight;
  }, [isLoading]);

  return (
    <MainLayout
      componentName="Chat Room"
      roomTitle={roomId ? chatRoomTitle : ""}
    >
      <div className={utilStyles.chat_area}>
        <div className={utilStyles.chat_display} id="chat-display">
          {isLoading ? (
            <div style={{ marginTop: "1rem" }}>
              <Spinner />
            </div>
          ) : (
            <ChatDisplay msgArray={chatMessages} />
          )}
        </div>

        <SendBar />
      </div>
    </MainLayout>
  );
}
