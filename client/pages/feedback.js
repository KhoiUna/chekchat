import MainLayout from "../containers/main_layout";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { appTheme, buttonTheme } from "../themes/theme";
import FeedbackUtil from "../utils/FeedbackUtil";

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback.subject && feedback.comment) {
      const res = await FeedbackUtil.submitFeedback(feedback);
    }
  };

  return (
    <MainLayout componentName="Feedback">
      <Typography
        variant="h6"
        gutterBottom
        style={{ margin: "0 1.3rem", fontWeight: "bold", textAlign: "left" }}
      >
        Please follow these steps to write a good feedback for us:
      </Typography>

      <Typography
        variant="h6"
        gutterBottom
        style={{ margin: "0 2.5rem", textAlign: "left", marginLeft: "2rem" }}
      >
        <ol>
          <li>Be specific on your feedback's subject.</li>
          <li>Write down the steps that lead you to the bug or error.</li>
          <li>
            Add any additional comment to your feedback (<i>optional </i>)
          </li>
        </ol>
      </Typography>

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
            rowsMax={7}
            variant="filled"
            className={classes.cardContent}
            value={feedback.comment}
            required
          />
          <br />

          <MuiThemeProvider theme={buttonTheme}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.cardContent}
            >
              Submit
            </Button>
          </MuiThemeProvider>
        </form>
      </Card>
    </MainLayout>
  );
}
