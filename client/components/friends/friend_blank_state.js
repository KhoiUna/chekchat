import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

export default function FriendBlankState() {
  return (
    <>
      <h3 style={{ marginTop: "20%" }}>
        <i>You have no friends yet!</i>
        <br />
      </h3>
      <Typography
        variant="p"
        color="textSecondary"
        style={{ margin: "1rem" }}
        component="p"
      >
        Click the Add Friend button
        <div
          style={{
            color: "rgba(0, 0, 0, 0.54)",
            display: "inline",
            margin: "3%",
            fontSize: "2rem",
          }}
        >
          <PersonAddIcon />
        </div>
        to send a friend request!
      </Typography>
    </>
  );
}
