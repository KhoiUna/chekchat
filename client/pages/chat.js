import MainLayout from "../containers/main_layout";
import UsersUtil from "../utils/UsersUtil";

export default function Chat({ userInfo }) {
  return (
    <MainLayout
      componentName="Chat"
      userInfo={userInfo}
      notificationCount={notificationCount}
    >
      <h3 style={{ marginTop: "1rem" }}>
        <i>Chat is not available yet!</i>
      </h3>
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
