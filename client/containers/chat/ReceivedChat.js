import { useDispatch, useSelector } from "react-redux";
import ChatroomTag from "../../components/chat/chatroom_tag";
import Typography from "@material-ui/core/Typography";
import {
  loadChatRoomsAsync,
  selectChatIsLoading,
  selectChatRooms,
} from "../../features/chatSlice";
import Spinner from "../../components/spinner";
import { Fragment, useEffect } from "react";

export default function ReceivedChat({}) {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectChatIsLoading);
  const chatRooms = useSelector(selectChatRooms);
  useEffect(() => {
    dispatch(loadChatRoomsAsync("received"));
  }, []);

  if (isLoading) return <Spinner />;

  if (chatRooms.length === 0)
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginTop: "10%" }}
        component="p"
      >
        <i>You have no discussions yet!</i>
      </Typography>
    );

  return chatRooms.map((item, index) => (
    <Fragment key={index}>
      <ChatroomTag
        username={item.from_user[0].username}
        roomId={item._id}
        avatarURL={item.from_user[0].avatarURL}
        subject={item.mission[0].subject}
        lastMessage={item.lastMessage}
        notified={item.notified}
      />
    </Fragment>
  ));
}
