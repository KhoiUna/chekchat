import { createTheme } from "@material-ui/core/styles";
import HUE from "@material-ui/core/colors/blue";

export const loginRegisterTheme = createTheme({
  palette: {
    primary: { main: HUE[800], contrastText: "#fff" },
  },
});

export const appTheme = createTheme({
  palette: {
    primary: { main: HUE[700], contrastText: HUE[700] },
  },
});

export const buttonTheme = createTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "#fff" },
  },
});

export const progressTheme = createTheme({
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

export const earlyAccessProgressTheme = createTheme({
  overrides: {
    MuiCircularProgress: {
      root: {
        width: "1.5rem !important",
        height: "1.5rem !important",
      },
      svg: {
        color: "#000",
      },
    },
  },
});
