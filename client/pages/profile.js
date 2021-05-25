import MainLayout from "../containers/main_layout";

export default function Profile({}) {
  return (
    <MainLayout componentName="Profile">
      <p>Profile</p>
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const cookieObj = ctx.res.req.cookies;

  return {
    props: {},
  };
}
