import MainLayout from "../containers/main_layout";
import Grid from "@material-ui/core/Grid";
import NotificationAlert from "../components/notifications/notification_alert";
import { fetchNotificationsList } from "../utils/Notifications";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import io from "socket.io-client";
import { origin } from "../config/config";

let socket;
export default function Notifications() {
  useEffect(() => {
    socket = io(origin, {
      withCredentials: true,
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const [notificationList, setNotificationList] = useState(null);
  useEffect(() => {
    fetchNotificationsList().then((r) => setNotificationList(r));
  }, []);

  if (notificationList?.length === 0)
    return (
      <MainLayout componentName="Notifications">
        <h3 style={{ marginTop: "1rem" }}>
          <i>You have no notifications here!</i>
        </h3>
      </MainLayout>
    );

  return (
    <MainLayout componentName="Notifications">
      {notificationList ? (
        <Grid container direction="column" justify="center" alignItems="center">
          {notificationList.map((i) => (
            <NotificationAlert
              notificationId={i._id}
              username={i.from_user.username}
              type={i.type}
              clicked={i.clicked}
              text={i.text}
              time={i.time}
              socket={socket}
            />
          ))}
        </Grid>
      ) : (
        <Spinner />
      )}
    </MainLayout>
  );
}
