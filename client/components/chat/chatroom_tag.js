import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../../helpers/imageLoader";
import utilStyles from "../../styles/utils.module.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles({
  gridColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    margin: "1rem 0",
    padding: "0 2%",
    cursor: "pointer",
    textAlign: "left",
  },
  gridRow: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    textAlign: "left",
    margin: 0,
  },
  overflowText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

const badgeTheme = createMuiTheme({
  overrides: {
    MuiBadge: {
      dot: {
        width: "1rem",
        borderRadius: "100%",
        marginTop: "2rem",
        height: null,
        minWidth: null,
      },
    },
  },
});

export default function ChatroomTag({
  username,
  roomId,
  avatarURL,
  subject,
  lastMessage,
  notified,
}) {
  const classes = useStyles();

  return (
    <Link href={`/chat/${roomId || 1}`}>
      <Grid container justify="center" className={classes.gridColumn}>
        <div className={utilStyles.image}>
          <Image
            loader={imageLoader}
            priority
            src={`${process.env.NEXT_PUBLIC_IMGKIT_IMGKIT_URL_ENDPOINT}tr:r-max${avatarURL}`}
            height={108}
            width={108}
            alt={username}
            className={utilStyles.image}
          />
        </div>

        <div className={classes.gridRow}>
          <Typography variant="h5" className={classes.overflowText}>
            {subject}
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            className={classes.overflowText}
          >
            {lastMessage}
          </Typography>
        </div>

        {notified && (
          <MuiThemeProvider theme={badgeTheme}>
            <Badge variant="dot" color="primary" />
          </MuiThemeProvider>
        )}
      </Grid>
    </Link>
  );
}
