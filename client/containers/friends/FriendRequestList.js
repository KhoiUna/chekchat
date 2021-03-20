import { useState, useEffect } from "react";
import FriendRequest from "../../components/friends/friend_request";
import { fetchFriendRequestsList } from "../../utils/Friends";

export default function FriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState([]);
  useEffect(() => {
    fetchFriendRequestsList().then((r) => setFriendRequestList(r));
  }, []);

  return (
    <>
      {friendRequestList.map((item) => (
        <FriendRequest
          username={item.to.username}
          email={item.to.email}
          avatarURL={item.to.avatarURL}
          status={item.status}
        />
      ))}
    </>
  );
}
