import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import imageLoader from "../../helpers/imageLoader";
import utilStyles from "../../styles/utils.module.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 270,
    margin: "0.8rem",
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
  overflowText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export default function FriendTag({ username, email, avatarURL }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.gridColumn}>
        <div className={utilStyles.image}>
          <Image
            loader={imageLoader}
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
            variant="h5"
            component="h2"
            className={classes.overflowText}
          >
            {username}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.overflowText}
          >
            {email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
