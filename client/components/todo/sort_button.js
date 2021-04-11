import { useState } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import SortIcon from "@material-ui/icons/Sort";
import utilsStyle from "../../styles/utils.module.css";
import HUE from "@material-ui/core/colors/blue";

const StyledMenu = (props) => (
  <Menu
    elevation={3}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
);

const buttonTheme = createMuiTheme({
  palette: {
    primary: { main: HUE[500], contrastText: "white" },
  },
});

export default function FilterButton({ sortTodoList }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [activeMenuItem, setActiveMenuItem] = useState("None");
  const handleClickMenuItem = (target, status) => {
    setActiveMenuItem(target.innerHTML);
    // sortTodoList(status);
  };

  return (
    <div className={utilsStyle.filterButton}>
      <MuiThemeProvider theme={buttonTheme}>
        <Button
          aria-controls="filter-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          <b>Sort by</b> <SortIcon style={{ marginLeft: "0.3rem" }} />
        </Button>
      </MuiThemeProvider>

      <StyledMenu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={({ target }) => handleClickMenuItem(target, "None")}
          style={
            activeMenuItem === "None"
              ? { backgroundColor: "#c0c0c078", color: "#2196f3" }
              : { backgroundColor: "transparent", color: "black" }
          }
        >
          <ListItemText primary="None" />
        </MenuItem>
        <MenuItem
          onClick={({ target }) => handleClickMenuItem(target, "Due date")}
          style={
            activeMenuItem === "Due date"
              ? { backgroundColor: "#c0c0c078", color: "#2196f3" }
              : { backgroundColor: "transparent", color: "black" }
          }
        >
          <ListItemText primary="Due date" />
        </MenuItem>
        <MenuItem
          onClick={({ target }) => handleClickMenuItem(target, "Starred")}
          style={
            activeMenuItem === "Starred"
              ? { backgroundColor: "#c0c0c078", color: "#2196f3" }
              : { backgroundColor: "transparent", color: "black" }
          }
        >
          <ListItemText primary="Starred" />
        </MenuItem>
        <MenuItem
          onClick={({ target }) => handleClickMenuItem(target, "...")}
          style={
            activeMenuItem === "..."
              ? { backgroundColor: "#c0c0c078", color: "#2196f3" }
              : { backgroundColor: "transparent", color: "black" }
          }
        >
          <ListItemText primary="..." />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
