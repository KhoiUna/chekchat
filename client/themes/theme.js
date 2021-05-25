import { createMuiTheme } from "@material-ui/core/styles";
import HUE from "@material-ui/core/colors/blue";

export const loginRegisterTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[800], contrastText: "#fff" },
  },
});

export const appTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[700], contrastText: HUE[700] },
  },
});

export const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "white" },
  },
});

export const progressTheme = createMuiTheme({
  overrides: {
    MuiCircularProgress: {
      root: {
        width: "1rem !important",
        height: "1rem !important",
        marginLeft: "1rem",
      },
      svg: {
        color: "white",
      },
    },
  },
});
