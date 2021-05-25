import MainLayout from "../containers/main_layout";
import NotificationsUtil from "../utils/NotificationsUtil";
import UsersUtil from "../utils/UsersUtil";

export default function Feedback({ userInfo, notificationCount }) {
  return (
    <MainLayout
      componentName="Feedback"
      userInfo={userInfo}
      notificationCount={notificationCount}
    >
      <p>Feedback</p>
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const cookieObj = ctx.res.req.cookies;

  const userInfo = await UsersUtil.fetchUserInfoServerSide(cookieObj);
  const notificationCount =
    await NotificationsUtil.fetchNotificationCountForBellServerSide(cookieObj);

  return {
    props: { userInfo, notificationCount },
  };
}
