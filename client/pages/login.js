import Layout from "../containers/layout";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { useState } from "react";

const origin =
  process.env.NEXT_PUBLIC_ORIGIN || "https://chekapp.herokuapp.com";

export default function Login() {
  const [responseText, setResponseText] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = ({ target }) => {
    let { name, value } = target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${origin}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok === false) setResponseText(await res.text());
      if (res.ok === true) setResponseText("");
    } catch (err) {
      console.error("Error logging in user");
    }
  };

  return (
    <Layout componentName="Login">
      <div className={utilStyles.container}>
        <form onSubmit={handleSubmit} onChange={handleChange}>
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
                  value={data.email}
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
                  value={data.password}
                />
              </Grid>

              {responseText && (
                <Grid item xs={12} sm={6}>
                  <p
                    className={utilStyles.responseText}
                    style={{ color: "red" }}
                  >
                    {responseText}
                  </p>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  className={utilStyles.button}
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>

        <Link href="/register">
          <p className={utilStyles.notice}>
            Have not created an account? Sign up
          </p>
        </Link>
      </div>
    </Layout>
  );
}
