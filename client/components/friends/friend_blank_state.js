import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

export default function FriendBlankState({ fromContainer }) {
  return (
    <>
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginTop: "10%" }}
      >
        {fromContainer === "FriendList" && <i>You have no friends yet!</i>}
        {fromContainer === "FriendRequestList" && (
          <i>You have no friend requests here!</i>
        )}
      </Typography>
      <Typography
        variant="p"
        color="textSecondary"
        style={{ margin: "1rem" }}
        component="p"
      >
        Click the Add Friend button
        <div
          style={{
            color: "#0000008a",
            display: "inline",
            margin: "0 0.5rem",
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
