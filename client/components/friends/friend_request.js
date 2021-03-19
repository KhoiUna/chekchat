import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import utilStyles from "../../styles/utils.module.css";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles({
  root: {
    maxWidth: 270,
  },
  media: {
    height: 20,
  },
  gridColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
  },
  gridRow: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
  },
  badge: {
    margin: "0.8rem 0",
  },
  overflowText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export default function FriendRequest({ username, email, avatarURL, status }) {
  const classes = useStyles();

  return (
    <Badge
      badgeContent={status || "Pending..."}
      color="primary"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      className={classes.badge}
    >
      <Card className={classes.root}>
        <CardActionArea className={classes.gridColumn}>
          <div className={utilStyles.request_image}>
            <Image
              priority
              src={avatarURL}
              height={108}
              width={108}
              alt={username}
            />
          </div>

          <CardContent className={classes.gridRow}>
            <Typography
              gutterBottom
              variant="h6"
              className={classes.overflowText}
            >
              {username}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {email}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Badge>
  );
}
