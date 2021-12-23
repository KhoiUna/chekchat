import MainLayout from "../containers/main_layout";
import Grid from "@material-ui/core/Grid";
import NotificationAlert from "../components/notifications/notification_alert";
import { Fragment, useEffect } from "react";
import Spinner from "../components/spinner";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  loadNotificationListAsync,
  selectNotificationList,
  selectNotificationIsLoading,
} from "../features/notificationSlice";
import { launched } from "../config/config";

export default function Notifications({}) {
  const dispatch = useDispatch();

  const notificationList = useSelector(selectNotificationList);
  const isLoading = useSelector(selectNotificationIsLoading);
  useEffect(() => {
    dispatch(loadNotificationListAsync());
  }, []);

  if (isLoading)
    return (
      <MainLayout componentName="Notifications">
        <Spinner />
      </MainLayout>
    );

  if (notificationList.length === 0)
    return (
      <MainLayout componentName="Notifications">
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: "10%" }}
          component="p"
        >
          <i>You have no notifications here!</i>
        </Typography>
      </MainLayout>
    );

  return (
    <MainLayout componentName="Notifications">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {notificationList.map((i, index) => (
          <Fragment key={index}>
            <NotificationAlert
              notificationId={i._id}
              username={i.from_user[0].username}
              type={i.type}
              clicked={i.clicked}
              text={i.text}
              time={i.time}
            />
          </Fragment>
        ))}
      </Grid>
    </MainLayout>
  );
}
