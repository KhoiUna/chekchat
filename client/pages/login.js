import Layout from "../containers/layout";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export default function Login() {
  return (
    <Layout componentName="Login">
      <div className={utilStyles.container}>
        <Paper elevation={10} className={utilStyles.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
            className={utilStyles.grid}
          >
            <h2 className={utilStyles.title}>LOGIN</h2>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="off"
                variant="filled"
                type="email"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="off"
                variant="filled"
                type="password"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                className="submit-button"
                className={utilStyles.button}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Link href="/register">
          <p className={utilStyles.notice}>
            Have not created an account? Sign up
          </p>
        </Link>
      </div>
    </Layout>
  );
}
