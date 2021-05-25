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
import UsersUtil from "../utils/UsersUtil";

export default function Notifications({ userInfo }) {
  const dispatch = useDispatch();

  const notificationList = useSelector(selectNotificationList);
  const isLoading = useSelector(selectNotificationIsLoading);
  useEffect(() => {
    dispatch(loadNotificationListAsync());
  }, []);

  if (isLoading)
    return (
      <MainLayout
        componentName="Notifications"
        userInfo={userInfo}
        notificationCount={notificationCount}
      >
        <Spinner />
      </MainLayout>
    );

  if (notificationList.length === 0)
    return (
      <MainLayout
        componentName="Notifications"
        userInfo={userInfo}
        notificationCount={notificationCount}
      >
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
    <MainLayout componentName="Notifications" userInfo={userInfo}>
      <Grid container direction="column" justify="center" alignItems="center">
        {notificationList.map((i, index) => (
          <Fragment key={index}>
            <NotificationAlert
              notificationId={i._id}
              username={i.from_user.username}
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

export async function getServerSideProps(ctx) {
  const cookieObj = ctx.res.req.cookies;

  const userInfo = await UsersUtil.fetchUserInfoServerSide(cookieObj);

  return {
    props: { userInfo },
  };
}
