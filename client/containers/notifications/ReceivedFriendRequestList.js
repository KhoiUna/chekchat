import { useState, useEffect } from "react";
import FriendRequest from "../../components/friends/friend_request";
import {
  fetchReceivedFriendRequestsList,
  actionFriendRequest,
} from "../../utils/FriendRequest";
import removeItemFromFriendRequest from "../../helpers/removeItemFromFriendRequest";

export default function ReceivedFriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState([]);
  useEffect(() => {
    console.log("fetch");
    fetchReceivedFriendRequestsList().then((r) => setFriendRequestList(r));
  }, []);

  const [change, setChange] = useState(false);
  const handleClick = async (action, requestId) => {
    const res = await actionFriendRequest(action, requestId);
    setChange(!change);
    setFriendRequestList(
      (prev) => (prev = removeItemFromFriendRequest(prev, requestId))
    );
  };

  return (
    <>
      {friendRequestList.map((item, index) => (
        <FriendRequest
          key={index}
          fromPage="notifications"
          requestId={item._id}
          username={item.from.username}
          email={item.from.email}
          avatarURL={item.from.avatarURL}
          status={item.status}
          onClickAction={handleClick}
        />
      ))}
    </>
  );
}
