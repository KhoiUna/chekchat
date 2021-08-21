import { useState, useEffect, Fragment } from "react";
import FriendRequest from "../../components/friends/friend_request";
import FriendRequestUtil from "../../utils/FriendRequestUtil";
import Spinner from "../../components/spinner";
import FriendBlankState from "../../components/friends/friend_blank_state";
import Grid from "@material-ui/core/Grid";

export default function FriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState(null);
  useEffect(() => {
    FriendRequestUtil.fetchSentFriendRequestsList()
      .then((r) => setFriendRequestList(r))
      .catch((err) => console.error("Error fetching friend requests list"));
  }, []);

  if (friendRequestList?.length === 0)
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "5rem" }}
      >
        <FriendBlankState fromContainer="FriendRequestList" />
      </Grid>
    );

  return friendRequestList ? (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ marginBottom: "5rem" }}
    >
      {friendRequestList.map((item, index) => (
        <Fragment key={index}>
          <FriendRequest
            key={index}
            requestId={item._id}
            username={item.from_user[0].username}
            email={item.from_user[0].email}
            avatarURL={item.from_user[0].avatarURL}
            onClickAction={handleClick}
          />
        </Fragment>
      ))}
    </Grid>
  ) : (
    <Spinner />
  );
}
