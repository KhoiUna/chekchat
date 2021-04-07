import MainLayout from "../containers/main_layout";
import Grid from "@material-ui/core/Grid";
import NotificationAlert from "../components/notifications/notification_alert";

const notificationList = [
  { from_user: { username: "holder" }, type: "friend", seen: true },
  { from_user: { username: "holder2" }, type: "mission", seen: false },
];

export default function Notifications() {
  return (
    <MainLayout componentName="Notifications">
      <Grid container direction="column" justify="center" alignItems="center">
        {notificationList.map((i) => (
          <NotificationAlert
            username={i.from_user.username}
            type={i.type}
            seen={i.seen}
          />
        ))}
      </Grid>
    </MainLayout>
  );
}
