import { useState, useEffect } from "react";
import FriendRequest from "../../components/friends/friend_request";
import { fetchSentFriendRequestsList } from "../../utils/FriendRequest";
import utilStyles from "../../styles/utils.module.css";

export default function FriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState(null);
  useEffect(() => {
    fetchSentFriendRequestsList().then((r) => setFriendRequestList(r));
  }, []);

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
    <p className={utilStyles.responseText}>Loading...</p>
  );
}
