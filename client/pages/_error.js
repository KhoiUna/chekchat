import Layout from "../containers/layout";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Typography from "@material-ui/core/Typography";

function Error({ statusCode }) {
  return (
    <Layout componentName="Login">
      <div className={utilStyles.container}>
        <Typography
          variant="h4"
          style={{ marginTop: "10%", textAlign: "center", color: "white" }}
        >
          A {statusCode} error occurs.
          <br />
          <div style={{ marginTop: "1%" }}>
            <i>
              Please try refreshing the page or head back to our{" "}
              <Link href="/login">
                <u style={{ cursor: "pointer", fontWeight: "bold" }}>login</u>
              </Link>{" "}
              page{" "}
            </i>
            😅
          </div>
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
