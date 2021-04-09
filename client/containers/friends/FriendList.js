import { useEffect, useState } from "react";
import FriendTag from "../../components/friends/friend_tag";
import { fetchFriendList } from "../../utils/Friends";
import Spinner from "../../components/spinner";
import FriendBlankState from "../../components/friends/friend_blank_state";
import Grid from "@material-ui/core/Grid";

export default function FriendList() {
  const [friendList, setFriendList] = useState(null);
  useEffect(() => {
    fetchFriendList().then((r) => setFriendList(r));
  }, []);

  if (friendList?.length === 0)
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ marginBottom: "5rem" }}
      >
        <FriendBlankState />
      </Grid>
    );

  return friendList ? (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ marginBottom: "5rem" }}
    >
      {friendList.map((item) => (
        <FriendTag
          username={item.friend.username}
          email={item.friend.email}
          avatarURL={item.friend.avatarURL}
        />
      ))}
    </Grid>
  ) : (
    <Spinner />
  );
}
