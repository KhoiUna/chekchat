import Layout from "../containers/layout";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export default function Register() {
  return (
    <Layout componentName="Register">
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
            <h2 className={utilStyles.title}>REGISTER</h2>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                fullWidth
                autoComplete="off"
                variant="filled"
              />
            </Grid>
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
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
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
                Create an account
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Link href="/login">
          <p className={utilStyles.notice}>Already have an account? Sign in</p>
        </Link>
      </div>
    </Layout>
  );
}
