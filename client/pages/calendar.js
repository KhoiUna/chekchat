import MainLayout from "../containers/main_layout";
import UsersUtil from "../utils/UsersUtil";
import NotificationsUtil from "../utils/NotificationsUtil";

export default function Calendar({ userInfo, notificationCount }) {
  return (
    <MainLayout
      componentName="Calendar"
      userInfo={userInfo}
      notificationCount={notificationCount}
    >
      <h3 style={{ marginTop: "1rem" }}>
        <i>Calendar is not available yet!</i>
      </h3>
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
