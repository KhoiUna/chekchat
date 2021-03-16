import Layout from "../containers/layout";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { useState } from "react";

const origin =
  process.env.NEXT_PUBLIC_ORIGIN || "https://chekapp.herokuapp.com";

export default function Register() {
  const [responseText, setResponseText] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const res = await fetch(`${origin}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok === true) {
        setResponseText(await res.text());
      }
    } catch (err) {
      console.error("Error registering user");
    }
  };

  return (
    <Layout componentName="Register">
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
                  value={data.username}
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
                  value={data.confirmPassword}
                />
              </Grid>

              {responseText && (
                <Grid item xs={12} sm={6}>
                  <p
                    className={utilStyles.responseText}
                    style={
                      responseText === "ok"
                        ? { color: "#3dda58" }
                        : { color: "red" }
                    }
                  >
                    {responseText === "ok"
                      ? "Register successfully"
                      : responseText}
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
                  Create an account
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>

        <Link href="/login">
          <p className={utilStyles.notice}>Already have an account? Sign in</p>
        </Link>
      </div>
    </Layout>
  );
}
