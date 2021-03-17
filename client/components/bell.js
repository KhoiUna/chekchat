import NotificationsIcon from "@material-ui/icons/Notifications";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

export default function Bell({ componentName, notificationCount }) {
  return (
    componentName !== "Notifications" && (
      <Link href="/notifications">
        <div style={{ display: "flex" }}>
          <NotificationsIcon
            className={utilStyles.icon}
            style={{ fontSize: "2.5rem" }}
          />
          <NotificationBadge
            count={notificationCount || 10}
            effect={Effect.SCALE}
            style={{ top: "1.2rem" }}
          />
        </div>
      </Link>
    )
  );
}
