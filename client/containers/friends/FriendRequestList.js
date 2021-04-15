import { useState, useEffect, Fragment } from "react";
import FriendRequest from "../../components/friends/friend_request";
import { fetchSentFriendRequestsList } from "../../utils/FriendRequest";
import Spinner from "../../components/spinner";
import FriendBlankState from "../../components/friends/friend_blank_state";
import Grid from "@material-ui/core/Grid";

export default function FriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState(null);
  useEffect(() => {
    fetchSentFriendRequestsList().then((r) => setFriendRequestList(r));
  }, []);

  if (friendRequestList?.length === 0)
    return (
      <Grid
        container
        direction="column"
        justify="center"
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
      justify="center"
      alignItems="center"
      style={{ marginBottom: "5rem" }}
    >
      {friendRequestList.map((item, index) => (
        <Fragment key={index}>
          <FriendRequest
            fromPage="friends"
            username={item.to.username}
            email={item.to.email}
            avatarURL={item.to.avatarURL}
            status={item.status}
          />
        </Fragment>
      ))}
    </Grid>
  ) : (
    <Spinner />
  );
}
