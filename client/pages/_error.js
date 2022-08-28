import Layout from "../containers/layout";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Typography from "@material-ui/core/Typography";

function Error({ statusCode }) {
  return (
    <Layout componentName="Error">
      <div className={utilStyles.container}>
        <Typography
          variant="h4"
          style={{ marginTop: "10%", textAlign: "center", color: "white" }}
        >
          {statusCode ? "A" : "An"} {statusCode} error occurs.
          <br />
          <div style={{ marginTop: "1%" }}>
            <i>
              Please try refreshing the page or heading back to our{" "}
              <Link href="/">
                <u style={{ cursor: "pointer", fontWeight: "bold" }}>home</u>
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
