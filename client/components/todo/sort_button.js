import { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import SortIcon from "@material-ui/icons/Sort";
import utilsStyle from "../../styles/utils.module.css";
import { buttonTheme } from "../../themes/theme";

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
    sortTodoList(status);
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
          onClick={({ target }) => handleClickMenuItem(target, "Completed")}
          style={
            activeMenuItem === "Completed"
              ? { backgroundColor: "#c0c0c078", color: "#2196f3" }
              : { backgroundColor: "transparent", color: "black" }
          }
        >
          <ListItemText primary="Completed" />
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
