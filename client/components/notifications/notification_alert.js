import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Divider from "@material-ui/core/Divider";
import FormatDatetime from "../../helpers/FormatDatetime";

const useStyles = makeStyles({
  root: {
    width: "85%",
    maxWidth: 600,
    margin: "0.8rem 0",
    backgroundColor: "#dbf4ff",
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
  username,
  type,
  text,
  seen,
  clicked,
  time,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={clicked ? { opacity: 0.6 } : null}>
      <CardActionArea className={classes.gridColumn}>
        <div style={{ color: "#0db3ff" }}>
          {type === "friend" && <PeopleIcon />}
          {type === "mission" && <AssignmentIcon />}
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
