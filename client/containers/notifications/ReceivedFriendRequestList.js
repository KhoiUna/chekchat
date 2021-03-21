import { useState, useEffect } from "react";
import FriendRequest from "../../components/friends/friend_request";
import { fetchReceivedFriendRequestsList } from "../../utils/FriendRequest";

export default function ReceivedFriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState([]);
  useEffect(() => {
    fetchReceivedFriendRequestsList().then((r) => setFriendRequestList(r));
  }, []);

  return (
    <>
      {friendRequestList.map((item) => (
        <FriendRequest
          fromPage="notifications"
          username={item.from.username}
          email={item.from.email}
          avatarURL={item.from.avatarURL}
          status={item.status}
        />
      ))}
    </>
  );
}
