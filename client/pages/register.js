import Layout from "../containers/layout";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import utilStyles from "../styles/login_register.module.css";
import Link from "next/link";
import { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { origin } from "../config/config";
import { loginRegisterTheme } from "../themes/theme";

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
      const res = await fetch(`${origin}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok === false) {
        setResponseText(await res.text());
      }
      if (res.ok === true) {
        setResponseText(await res.text());
        setData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
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
              justifyContent="center"
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
                <MuiThemeProvider theme={loginRegisterTheme}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={utilStyles.button}
                    type="submit"
                  >
                    Create an account
                  </Button>
                </MuiThemeProvider>
              </Grid>
            </Grid>
          </Paper>
        </form>

        <Link href="/login">
          <p className={utilStyles.notice}>
            Already have an account?
            <span
              style={{
                borderBottom: "2px solid",
                fontStyle: "italic",
                marginLeft: "2px",
              }}
            >
              Sign in
            </span>
          </p>
        </Link>
      </div>
    </Layout>
  );
}
