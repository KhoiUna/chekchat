import MainLayout from "../containers/main_layout";
import UsersUtil from "../utils/UsersUtil";

export default function Feedback({ userInfo }) {
  return (
    <MainLayout componentName="Feedback" userInfo={userInfo}>
      <p>Feedback</p>
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
