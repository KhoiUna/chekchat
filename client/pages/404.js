import Layout from "../containers/layout";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Typography from "@material-ui/core/Typography";

export default function Custom404() {
  return (
    <Layout componentName="Error">
      <div className={utilStyles.container}>
        <Typography
          variant="h4"
          style={{ marginTop: "10%", textAlign: "center", color: "white" }}
        >
          A 404 error occurs.
          <br />
          <div style={{ marginTop: "1%" }}>
            <i>
              We cannot find the page you are looking for. Please head back to
              our{" "}
              <Link href="/">
                <u style={{ cursor: "pointer", fontWeight: "bold" }}>home</u>
              </Link>{" "}
              page.
            </i>
          </div>
        </Typography>
      </div>
    </Layout>
  );
}
