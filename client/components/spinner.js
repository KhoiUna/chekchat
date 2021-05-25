import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { buttonTheme } from "../themes/theme";

export default function Spinner() {
  return (
    <MuiThemeProvider theme={buttonTheme}>
      <CircularProgress style={{ margin: "5% 0" }} />
    </MuiThemeProvider>
  );
}
