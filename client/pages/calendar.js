import MainLayout from "../containers/main_layout";
import UsersUtil from "../utils/UsersUtil";

export default function Calendar({ userInfo }) {
  return (
    <MainLayout componentName="Calendar" userInfo={userInfo}>
      <h3 style={{ marginTop: "1rem" }}>
        <i>Calendar is not available yet!</i>
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
