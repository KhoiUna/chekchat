import MainLayout from "../containers/main_layout";
import ChatroomTag from "../components/chat/chatroom_tag";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  loadChatRoomsAsync,
  selectChatIsLoading,
  selectChatRooms,
} from "../features/chatSlice";
import Spinner from "../components/spinner";
import { useEffect } from "react";

export default function Chat({}) {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectChatIsLoading);
  const chatRooms = useSelector(selectChatRooms);
  useEffect(() => {
    dispatch(loadChatRoomsAsync());
  }, []);

  if (isLoading)
    return (
      <MainLayout componentName="Chat">
        <Spinner />
      </MainLayout>
    );

  if (chatRooms.length === 0)
    return (
      <MainLayout componentName="Chat">
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: "10%" }}
          component="p"
        >
          <i>You have no discussions yet!</i>
        </Typography>
      </MainLayout>
    );

  return (
    <MainLayout componentName="Chat">
      <Grid container direction="column" justify="center" alignItems="center">
        {chatRooms.map((item) => (
          <ChatroomTag />
        ))}
      </Grid>
    </MainLayout>
  );
}
