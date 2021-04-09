import { useState, useEffect } from "react";
import FriendRequest from "../../components/friends/friend_request";
import { fetchSentFriendRequestsList } from "../../utils/FriendRequest";
import Spinner from "../../components/spinner";
import FriendBlankState from "../../components/friends/friend_blank_state";

export default function FriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState(null);
  useEffect(() => {
    fetchSentFriendRequestsList().then((r) => setFriendRequestList(r));
  }, []);

  if (friendRequestList?.length === 0) return <FriendBlankState />;

  return friendRequestList ? (
    <>
      {friendRequestList.map((item) => (
        <FriendRequest
          fromPage="friends"
          username={item.to.username}
          email={item.to.email}
          avatarURL={item.to.avatarURL}
          status={item.status}
        />
      ))}
    </>
  ) : (
    <Spinner />
  );
}
