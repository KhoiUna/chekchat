import NotificationsIcon from "@material-ui/icons/notifications";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";

export default function Bell({ componentName }) {
  return (
    componentName !== "Notifications" && (
      <Link href="/notifications">
        <NotificationsIcon
          className={utilStyles.icon}
          style={{ fontSize: "2rem" }}
        />
      </Link>
    )
  );
}
