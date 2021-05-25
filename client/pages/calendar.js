import MainLayout from "../containers/main_layout";

export default function Calendar({}) {
  return (
    <MainLayout componentName="Calendar">
      <h3 style={{ marginTop: "1rem" }}>
        <i>Calendar is not available yet!</i>
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
