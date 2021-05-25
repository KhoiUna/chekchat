import MainLayout from "../containers/main_layout";

export default function Chat({}) {
  return (
    <MainLayout componentName="Chat">
      <h3 style={{ marginTop: "1rem" }}>
        <i>Chat is not available yet!</i>
      </h3>
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const cookieObj = ctx.res.req.cookies;

  return {
    props: {},
  };
}
