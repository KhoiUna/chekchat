import NotificationsIcon from "@material-ui/icons/Notifications";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Badge from "@material-ui/core/Badge";

export default function Bell({ componentName, notificationCount }) {
  return (
    componentName !== "Notifications" && (
      <Link href="/notifications">
        <div>
          <Badge
            badgeContent={notificationCount || 100}
            color="error"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            max={99}
            overlap="circle"
            className={utilStyles.icon}
          >
            <NotificationsIcon style={{ fontSize: "2rem" }} />
          </Badge>
        </div>
      </Link>
    )
  );
}
