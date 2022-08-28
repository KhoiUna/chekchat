import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

export default function Chat({ componentName, notificationCount }) {
  return (
    componentName !== "Chat" && (
      <Link href="/chat">
        <IconButton aria-label="Open Chat page">
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
            <QuestionAnswerIcon style={{ fontSize: "2rem" }} />
          </Badge>
        </IconButton>
      </Link>
    )
  );
}
