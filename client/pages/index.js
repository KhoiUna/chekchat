import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Logo from "../components/logo";
import homeStyles from "../styles/home.module.css";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PeopleIcon from "@material-ui/icons/People";
import UpdateIcon from "@material-ui/icons/Update";
import WidgetsIcon from "@material-ui/icons/Widgets";
import InstagramIcon from "@material-ui/icons/Instagram";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";

export default function Home() {
  useEffect(() => {
    const jumbotronTitle = "The app for assigning tasks";
    const speed = 60;
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
    }, speed);

    return () => {
      clearInterval(typeWriterInterval);
    };
  }, []);

  const [email, setEmail] = useState("");
  const handleChange = ({ target }) => {
    setEmail(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="The app for assigning tasks" />
        <meta
          name="keywords"
          content="chekchat, task app, productivity app, chat app"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="og:title" property="og:title" content="ChekChat | Home" />
        <meta
          property="og:image"
          content="https://www.chekchat.xyz/logo192.png"
        />
        <link rel="canonical" href="https://chekchat.xyz/" />
        <link rel="image_src" href="/logo192.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>ChekChat | Home</title>
      </Head>

      <body>
        <header className={homeStyles.header}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link href="/">
              <Logo
                style={{
                  width: "4rem",
                  height: "4rem",
                  margin: "0.3rem 0 0.3rem 1rem",
                  backgroundColor: "#0db3ff",
                  cursor: "pointer",
                }}
              />
            </Link>

            <nav className={homeStyles.nav}>
              <Link href="#features">
                <Typography
                  variant="body1"
                  gutterBottom
                  className={homeStyles.nav_item}
                >
                  Features
                </Typography>
              </Link>

              <Link href="/pricing">
                <Typography
                  variant="body1"
                  gutterBottom
                  className={homeStyles.nav_item}
                >
                  Pricing
                </Typography>
              </Link>
            </nav>
          </Grid>
        </header>

        <main className={homeStyles.main}>
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
              <br />

              <button className={homeStyles.request_button} type="submit">
                Request Access
              </button>
            </form>
          </section>

          <section style={{ margin: "1rem 1rem 2.5rem 1rem" }}>
            <div className={homeStyles.media}>
              <iframe
                width="100%"
                height="500"
                src="https://www.youtube-nocookie.com/embed/7hqGhvkNuhk?controls=0"
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

          <section className={homeStyles.features_section}>
            <hr />

            <Typography
              id="features"
              variant="h4"
              gutterBottom
              className={homeStyles.feature_title}
            >
              <b>Features</b>
            </Typography>

            <Card variant="outlined" className={homeStyles.feature_card}>
              <CardContent>
                <div className={homeStyles.feature_card_flex}>
                  <AssignmentIndOutlinedIcon
                    className={homeStyles.feature_icons}
                  />
                  <Typography variant="h5" component="h2">
                    Assign
                  </Typography>
                </div>

                <Typography
                  color="textSecondary"
                  className={homeStyles.feature_description}
                >
                  <ul>
                    <li className={homeStyles.feature_list_items}>
                      Send task requests.
                    </li>

                    <li className={homeStyles.feature_list_items}>
                      Assign them to a member on your team.
                    </li>
                  </ul>
                </Typography>
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

                <Typography
                  color="textSecondary"
                  className={homeStyles.feature_description}
                >
                  <ul>
                    <li className={homeStyles.feature_list_items}>
                      Your team member accepts task request.
                    </li>
                    <li className={homeStyles.feature_list_items}>
                      Task will be transferred to the app's todo list.
                    </li>
                  </ul>
                </Typography>
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

                <Typography
                  color="textSecondary"
                  className={homeStyles.feature_description}
                >
                  <ul>
                    <li className={homeStyles.feature_list_items}>
                      Automatically create chat room for accepted task.
                    </li>
                    <li className={homeStyles.feature_list_items}>
                      Communicate in a single channel at once.
                    </li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </section>
        </main>

        <footer className={homeStyles.footer}>
          <div className={homeStyles.footer_flex_container}>
            <section style={{ margin: "0 0 1.5rem 0" }}>
              <div className={homeStyles.footer_logo}>
                <Logo
                  style={{
                    width: "4rem",
                    height: "4rem",
                    margin: 0,
                    backgroundColor: "#0db3ff",
                  }}
                />
                <h1 className={homeStyles.title}>hekChat</h1>
              </div>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: "1.1rem" }}
              >
                The app for assigning tasks
              </Typography>
            </section>

            <nav className={homeStyles.footer_nav}>
              <section>
                <Typography variant="h6" gutterBottom>
                  <b>Pricing:</b>
                </Typography>
                <Link href="/pricing">
                  <Typography
                    variant="body1"
                    gutterBottom
                    className={homeStyles.footer_nav_item}
                  >
                    Plans
                  </Typography>
                </Link>
              </section>

              <section>
                <Typography variant="h6" gutterBottom>
                  <b>Contact Us:</b>
                </Typography>

                <Link href="mailto:help@chekchat.xyz">
                  <Typography
                    variant="body1"
                    gutterBottom
                    className={homeStyles.footer_nav_item}
                  >
                    help@chekchat.xyz
                  </Typography>
                </Link>

                <a
                  href="https://www.instagram.com/chek.chat/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <InstagramIcon className={homeStyles.social_icons} />
                </a>
              </section>
            </nav>
          </div>

          <section className={homeStyles.copyright_section}>
            <Typography gutterBottom variant="subtitle2" style={{ margin: 0 }}>
              &copy; {new Date().getFullYear()} ChekChat
            </Typography>
          </section>
        </footer>
      </body>
    </>
  );
}
