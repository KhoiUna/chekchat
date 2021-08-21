import MainLayout from "../../containers/main_layout";
import Spinner from "../../components/spinner";
import ChatDisplay from "../../containers/chat/ChatDisplay";
import SendBar from "../../components/chat/send_bar";
import utilStyles from "../../styles/utils.module.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadChatRoomTitleAsync,
  loadChatMessagesAsync,
  selectChatIsLoading,
  selectChatRoomTitle,
  selectChatMessages,
} from "../../features/chatSlice";

export default function ChatRoom({ roomId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("chatReloaded")) window.location.reload();
    localStorage.setItem("chatReloaded", true);
  }, []);

  const isLoading = useSelector(selectChatIsLoading);
  const chatRoomTitle = useSelector(selectChatRoomTitle);
  const chatMessages = useSelector(selectChatMessages);
  useEffect(() => {
    dispatch({
      type: "chat/subscribe",
      payload: roomId,
    });

    dispatch(loadChatRoomTitleAsync(roomId));

    dispatch(loadChatMessagesAsync({ roomId, queryLimit: 0 }));
  }, []);

  const firstLoad = useRef(true);
  useEffect(() => {
    document.querySelector("#chat-display").scrollTop =
      document.querySelector("#chat-display").scrollHeight;
  }, []);

  const [queryLimit, setQueryLimit] = useState(1);
  const newMessageArrayLength = useRef(20);
  const scrollToLoadMessages = () => {
    if (
      document.getElementById("chat-display").scrollTop === 0 &&
      newMessageArrayLength.current === 20
    ) {
      firstLoad.current = false;

      dispatch(loadChatMessagesAsync({ roomId, queryLimit }));
      newMessageArrayLength.current =
        chatMessages.length - 20 * (queryLimit - 1);
      setQueryLimit((prev) => prev + 1);
    }
  };

  return (
    <MainLayout
      componentName="Chat Room"
      roomTitle={roomId ? chatRoomTitle : ""}
    >
      <div className={utilStyles.chat_area}>
        <div
          className={utilStyles.chat_display}
          id="chat-display"
          onScroll={scrollToLoadMessages}
        >
          {isLoading && firstLoad.current ? (
            <div style={{ marginTop: "1rem" }}>
              <Spinner />
            </div>
          ) : (
            <>
              {isLoading && !firstLoad.current && <Spinner />}
              <ChatDisplay msgArray={chatMessages} />
            </>
          )}
        </div>

        <SendBar />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { roomId } = context.params;

  return {
    props: { roomId },
  };
}
