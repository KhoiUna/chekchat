import MainLayout from "../containers/main_layout";
import NotificationsUtil from "../utils/NotificationsUtil";
import UsersUtil from "../utils/UsersUtil";

export default function Profile({ userInfo, notificationCount }) {
  return (
    <MainLayout
      componentName="Profile"
      userInfo={userInfo}
      notificationCount={notificationCount}
    >
      <p>Profile</p>
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
