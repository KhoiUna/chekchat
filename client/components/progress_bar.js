import React, { useEffect, useState } from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { buttonTheme } from "../themes/theme";

const useStyles = makeStyles({
  root: {
    width: "50%",
    maxWidth: "222px",
    marginTop: "1rem",
  },
});

export default function ProgressBar({ progressValue }) {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const diff = Math.random() * 10;
        return Math.min(prev + diff, 100);
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={buttonTheme}>
        <LinearProgress
          variant="determinate"
          value={progressValue || progress}
        />
      </MuiThemeProvider>
    </div>
  );
}
