import {
  makeStyles,
  MuiThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import utilStyles from "../../styles/utils.module.css";
import CardActions from "@material-ui/core/CardActions";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import imageLoader from "../../helpers/imageLoader";

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
  notificationgridRow: {
    display: "grid",
    gridTemplateRows: "2fr 1fr",
  },
  badge: {
    margin: "0.8rem 2rem",
  },
  overflowText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  notificationRoot: {
    maxWidth: 270,
    margin: "0.8rem 0",
  },
});

const friendRequestButtonTheme = createTheme({
  palette: {
    primary: { main: "#2cb32c" },
  },
});

export default function FriendRequest({
  requestId,
  username,
  email,
  avatarURL,
  onClickAction,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.notificationRoot}>
      <CardActionArea className={classes.gridColumn}>
        <div className={utilStyles.request_image}>
          <Image
            loader={imageLoader}
            priority
            src={avatarURL}
            height={108}
            width={108}
            alt={username}
          />
        </div>

        <CardContent className={classes.notificationgridRow}>
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

          <CardActions>
            <MuiThemeProvider theme={friendRequestButtonTheme}>
              <IconButton
                aria-label="accept"
                color="primary"
                onClick={() => onClickAction("accept", requestId)}
              >
                <DoneIcon />
              </IconButton>

              <IconButton
                aria-label="reject"
                color="secondary"
                onClick={() => onClickAction("reject", requestId)}
              >
                <CloseIcon />
              </IconButton>
            </MuiThemeProvider>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
