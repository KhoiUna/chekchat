import MainLayout from "../containers/main_layout";
import Grid from "@material-ui/core/Grid";
import NotificationAlert from "../components/notifications/notification_alert";
import { fetchNotificationsList } from "../utils/Notifications";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";

export default function Notifications() {
  const [notificationList, setNotificationList] = useState(null);
  useEffect(() => {
    fetchNotificationsList().then((r) => setNotificationList(r));
  }, []);

  return (
    <MainLayout componentName="Notifications">
      {notificationList ? (
        <Grid container direction="column" justify="center" alignItems="center">
          {notificationList.map((i) => (
            <NotificationAlert type={i.type} seen={i.seen} text={i.text} />
          ))}
        </Grid>
      ) : (
        <Spinner />
      )}
    </MainLayout>
  );
}
