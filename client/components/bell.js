import NotificationsIcon from "@material-ui/icons/Notifications";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

export default function Bell({ componentName, notificationCount }) {
  return (
    componentName !== "Notifications" && (
      <Link href="/notifications">
        <IconButton aria-label="Open Notification page">
          <Badge
            badgeContent={notificationCount}
            color="error"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            max={99}
            overlap="circular"
            className={utilStyles.icon}
          >
            <NotificationsIcon style={{ fontSize: "2rem" }} />
          </Badge>
        </IconButton>
      </Link>
    )
  );
}
