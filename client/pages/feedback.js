import MainLayout from "../containers/main_layout";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import utilStyles from "../styles/login_register.module.css";
import { appTheme, buttonTheme } from "../themes/theme";
import FeedbackUtil from "../utils/FeedbackUtil";
import { launched } from "../config/config";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "1rem",
  },
  cardContent: {
    margin: "1rem 0",
  },
}));

export default function Feedback({}) {
  const classes = useStyles();

  const [feedback, setFeedback] = useState({
    subject: "",
    comment: "",
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
    setResponseText("");
  };

  const [responseText, setResponseText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback.subject && feedback.comment) {
      const res = await FeedbackUtil.submitFeedback(feedback);

      if (res.ok === true) {
        setFeedback({
          subject: "",
          comment: "",
        });
        setResponseText("Submitted successfully.");
      }
    }
  };

  return (
    <MainLayout componentName="Feedback">
      <div style={{ margin: "1% 0", textAlign: "left" }}>
        <Typography
          variant="h6"
          gutterBottom
          style={{ margin: "0 1.3rem", fontWeight: "bold" }}
        >
          Please follow these steps to write a good feedback for us:
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          style={{ margin: "0 2.5rem", marginLeft: "2rem" }}
        >
          <ol>
            <li>Be specific on your feedback's subject.</li>
            <li>Write down the steps that lead you to the bug or error.</li>
            <li>
              Add any additional comment to your feedback (<i>optional </i>)
            </li>
          </ol>
        </Typography>
      </div>

      <Card className={classes.card}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <MuiThemeProvider theme={appTheme}>
            <TextField
              label="Subject"
              name="subject"
              variant="filled"
              value={feedback.subject}
              className={classes.cardContent}
              required
            />
          </MuiThemeProvider>
          <br />

          <TextField
            id="filled-textarea"
            label="Comment"
            name="comment"
            placeholder="Write the steps here"
            multiline
            rows={4}
            maxRows={7}
            variant="filled"
            className={classes.cardContent}
            value={feedback.comment}
            required
          />
          <br />

          {responseText && (
            <p className={utilStyles.responseText} style={{ color: "#3dda58" }}>
              {responseText}
              <br />
              Thank you for your feedback!
            </p>
          )}

          <MuiThemeProvider theme={buttonTheme}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.cardContent}
              disabled={
                !Boolean(feedback.subject) || !Boolean(feedback.comment)
              }
            >
              Submit
            </Button>
          </MuiThemeProvider>
        </form>
      </Card>
    </MainLayout>
  );
}
