import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Divider from "@material-ui/core/Divider";
import FormatDatetime from "../../helpers/FormatDatetime";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "85%",
    maxWidth: 600,
    margin: "0.8rem 0",
  },
  gridColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 0fr 4fr",
  },
  gridRow: {
    display: "grid",
    gridTemplateRows: "4fr 1fr",
  },
  divider: {
    margin: "0.7rem 0 0.7rem 0",
  },
});

export default function NotificationAlert({
  notificationId,
  username,
  type,
  text,
  clicked,
  time,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (notificationId, type) => {
    dispatch({
      type: "notifications/clickNotification",
      payload: notificationId,
    });

    if (type === "task") {
      router.push("/send");
      return;
    }
    router.push("/friends");
  };

  return (
    <Card
      className={classes.root}
      style={
        clicked ? { backgroundColor: "white" } : { backgroundColor: "#dbf4ff" }
      }
      onClick={() => handleClick(notificationId, type)}
    >
      <CardActionArea className={classes.gridColumn}>
        <div style={{ color: "#0db3ff" }}>
          {type === "friend" && <PeopleIcon />}
          {type === "task" && <AssignmentIcon />}
        </div>

        <Divider orientation="vertical" flexItem className={classes.divider} />

        <CardContent className={classes.gridRow}>
          <Typography gutterBottom variant="h6" style={{ textAlign: "left" }}>
            <b>{username}</b> {text}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ textAlign: "right" }}
          >
            {FormatDatetime.forNotification(time)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
