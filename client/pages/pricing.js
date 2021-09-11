import HomeLayout from "../containers/home_layout";
import Typography from "@material-ui/core/Typography";
import homeStyles from "../styles/home.module.css";
import { useState } from "react";

export default function Pricing({}) {
  const [email, setEmail] = useState("");
  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <HomeLayout componentName="Pricing">
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          margin: "0.8rem 0",
        }}
      >
        <div>
          <section style={{ margin: "1rem", textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              We currently do not have a pricing plan yet!
            </Typography>
            <Typography variant="h4" gutterBottom>
              But we do have a{" "}
              <span
                style={{
                  borderBottom: "3px solid #0db3ff",
                  backgroundColor: "#efff6e",
                }}
              >
                free plan
              </span>{" "}
              for our beta users
            </Typography>

            <Typography variant="h5" gutterBottom>
              Enter your email below to get early accesss!
            </Typography>
          </section>

          <section>
            <form
              autoComplete="off"
              className={homeStyles.email_form}
              onSubmit={handleSubmit}
            >
              <label htmlFor="email" hidden>
                Email Address:
              </label>
              <input
                type="email"
                required
                className={homeStyles.email_input}
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleChange}
              />
              <br />

              <button className={homeStyles.request_button} type="submit">
                Get Early Access
              </button>
            </form>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
