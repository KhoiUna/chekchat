import HomeLayout from "../containers/home_layout";
import Typography from "@material-ui/core/Typography";
import homeStyles from "../styles/home.module.css";
import { useState } from "react";
import { origin } from "../config/config";

export default function Pricing({}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ color: "", text: "" });
  const handleChange = ({ target }) => {
    setStatus({ color: "", text: "" });
    setEmail(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${origin}/api/requestAccess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok === true) {
        setEmail("");
        return setStatus({
          color: "#3dda58",
          text: "You will receive a survey lately in your inbox. Please answer it to get early access.",
        });
      }

      return setStatus({
        color: "red",
        text: await res.text(),
      });
    } catch (err) {
      console.error("Error submitting email");
      return;
    }
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
              {status.text && (
                <p
                  gutterBottom
                  style={{
                    color: status.color,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    margin: "1.5rem 0 0.5rem 0",
                  }}
                >
                  {status.text}
                </p>
              )}
              <br />

              <button
                className={homeStyles.request_button}
                type="submit"
                style={status.text ? { marginTop: 0 } : null}
              >
                Get Early Access
              </button>
            </form>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
