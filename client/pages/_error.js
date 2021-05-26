import Layout from "../containers/layout";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Typography from "@material-ui/core/Typography";

function Error({ statusCode }) {
  return (
    <Layout componentName="Login">
      <div className={utilStyles.container}>
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: "10%" }}
        >
          An {statusCode} error occurs. Please try refreshing the page or head
          back to our{" "}
          <Link href="/login">
            <u>login</u>
          </Link>{" "}
          page
        </Typography>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
