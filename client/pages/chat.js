import MainLayout from "../containers/main_layout";
import ChatroomTag from "../components/chat/chatroom_tag";
import Grid from "@material-ui/core/Grid";

export default function Chat({}) {
  return (
    <MainLayout componentName="Chat">
      <Grid container direction="column" justify="center" alignItems="center">
        <ChatroomTag />
        <ChatroomTag />
        <ChatroomTag />
        <ChatroomTag />
        <ChatroomTag />
        <ChatroomTag />
        <ChatroomTag />
        <ChatroomTag />
        <ChatroomTag />
        <ChatroomTag />
        <ChatroomTag />
      </Grid>
    </MainLayout>
  );
}
