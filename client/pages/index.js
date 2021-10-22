import { useEffect, useState } from "react";
import homeStyles from "../styles/home.module.css";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PeopleIcon from "@material-ui/icons/People";
import UpdateIcon from "@material-ui/icons/Update";
import WidgetsIcon from "@material-ui/icons/Widgets";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import HomeLayout from "../containers/home_layout";
import { origin } from "../config/config";

export default function Home({}) {
  useEffect(() => {
    const jumbotronTitle = "The app for assigning tasks";
    const speed = 50;
    let i = 0;

    const typeWriter = () => {
      if (i < jumbotronTitle.length) {
        document.getElementById(
          "jumbotron_title"
        ).innerHTML += `<span>${jumbotronTitle.charAt(i)}</span>${
          i + 1 === jumbotronTitle.length
            ? `<span class=${homeStyles.blink_caret}></span>`
            : ""
        }`;

        i++;
      }
    };

    const typeWriterInterval = setInterval(() => {
      typeWriter();

      if (i === jumbotronTitle.length) clearInterval(typeWriterInterval);
    }, speed);

    return () => {
      clearInterval(typeWriterInterval);
    };
  }, []);

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
    <HomeLayout componentName="Home">
      <section style={{ margin: "1rem" }}>
        <div className={homeStyles.jumbotron}>
          <Typography
            variant="h4"
            gutterBottom
            className={homeStyles.jumbotron_title}
            id="jumbotron_title"
          ></Typography>

          <Typography variant="h5" gutterBottom>
            Made for teamwork and productivity
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Help teams communicate efficiently to get work done
          </Typography>
        </div>
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

      <section style={{ margin: "1rem 1rem 2.5rem 1rem" }}>
        <div className={homeStyles.media}>
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/rUhvXjrvzX8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className={homeStyles.info_cards_flex_container}>
        <Card variant="outlined" className={homeStyles.info_card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Simple
            </Typography>
            <Typography
              color="textSecondary"
              className={homeStyles.info_description}
            >
              Easy to use & intuitive. Anyone can master it
            </Typography>
            <WidgetsIcon className={homeStyles.info_icons} />
          </CardContent>
        </Card>

        <Card variant="outlined" className={homeStyles.info_card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Fast
            </Typography>
            <Typography
              color="textSecondary"
              className={homeStyles.info_description}
            >
              Send messages to your team in a blink of an eye
            </Typography>
            <UpdateIcon className={homeStyles.info_icons} />
          </CardContent>
        </Card>

        <Card variant="outlined" className={homeStyles.info_card}>
          <CardContent>
            <Typography variant="h5">Organized</Typography>
            <Typography
              color="textSecondary"
              className={homeStyles.info_description}
            >
              All of your tasks are located in one place
            </Typography>
            <PeopleIcon className={homeStyles.info_icons} />
          </CardContent>
        </Card>
      </section>

      <div id="features"></div>
      <section className={homeStyles.features_section}>
        <hr />

        <Typography
          variant="h4"
          gutterBottom
          className={homeStyles.feature_title}
        >
          <b>Features</b>
        </Typography>

        <Card variant="outlined" className={homeStyles.feature_card}>
          <CardContent>
            <div className={homeStyles.feature_card_flex}>
              <AssignmentIndOutlinedIcon className={homeStyles.feature_icons} />
              <Typography variant="h5" component="h2">
                Assign
              </Typography>
            </div>

            <ul className={homeStyles.feature_lists}>
              <li className={homeStyles.feature_list_items}>
                <Typography
                  color="textSecondary"
                  className={homeStyles.feature_description}
                >
                  Send task requests.
                </Typography>
              </li>

              <li className={homeStyles.feature_list_items}>
                <Typography
                  color="textSecondary"
                  className={homeStyles.feature_description}
                >
                  Assign them to a member on your team.
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card variant="outlined" className={homeStyles.feature_card}>
          <CardContent>
            <div className={homeStyles.feature_card_flex}>
              <ListAltOutlinedIcon className={homeStyles.feature_icons} />
              <Typography variant="h5" component="h2">
                Todo
              </Typography>
            </div>

            <ul className={homeStyles.feature_lists}>
              <li className={homeStyles.feature_list_items}>
                <Typography
                  color="textSecondary"
                  className={homeStyles.feature_description}
                >
                  Your team member accepts task request.
                </Typography>
              </li>

              <li className={homeStyles.feature_list_items}>
                <Typography
                  color="textSecondary"
                  className={homeStyles.feature_description}
                >
                  Task will be transferred to the app's todo list.
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card variant="outlined" className={homeStyles.feature_card}>
          <CardContent>
            <div className={homeStyles.feature_card_flex}>
              <MessageOutlinedIcon className={homeStyles.feature_icons} />
              <Typography variant="h5" component="h2">
                Chat
              </Typography>
            </div>

            <ul className={homeStyles.feature_lists}>
              <li className={homeStyles.feature_list_items}>
                <Typography
                  color="textSecondary"
                  className={homeStyles.feature_description}
                >
                  Automatically create chat room for accepted task.
                </Typography>
              </li>

              <li className={homeStyles.feature_list_items}>
                <Typography
                  color="textSecondary"
                  className={homeStyles.feature_description}
                >
                  Communicate in a single channel at once.
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </HomeLayout>
  );
}
