import Layout from "../containers/layout";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import utilStyles from "../styles/login_register.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { origin, cookieOptions, launched } from "../config/config";
import { loginRegisterTheme } from "../themes/theme";
import { useCookies } from "react-cookie";

export default function Login() {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
  useEffect(() => {
    if (cookies.redirectLogin === "true") {
      window.location.reload();
      removeCookie("redirectLogin");
    }
  }, []);
  useEffect(() => {
    if (cookies.loggedIn) router.push("/inbox");
  }, []);

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
    setResponseText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${origin}/api/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok === false) {
        setData((prev) => ({
          ...prev,
          password: "",
        }));
        setResponseText("Invalid email or password");
      }
      if (res.ok === true) {
        setCookie("loggedIn", true, cookieOptions);
        router.push("/inbox");
      }
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
              justifyContent="center"
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
                <MuiThemeProvider theme={loginRegisterTheme}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={utilStyles.button}
                    type="submit"
                  >
                    Login
                  </Button>
                </MuiThemeProvider>
              </Grid>
            </Grid>
          </Paper>
        </form>

        <Link href="/register">
          <p className={utilStyles.notice}>
            Have not created an account?
            <span
              style={{
                borderBottom: "2px solid",
                fontStyle: "italic",
                marginLeft: "2px",
              }}
            >
              Sign up
            </span>
          </p>
        </Link>
      </div>
    </Layout>
  );
}
