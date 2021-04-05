import { useState, useEffect } from "react";
import FriendRequest from "../../components/friends/friend_request";
import {
  fetchReceivedFriendRequestsList,
  actionFriendRequest,
} from "../../utils/FriendRequest";
import removeItemFromList from "../../helpers/removeItemFromList";
import Spinner from "../../components/spinner";

export default function ReceivedFriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState(null);
  useEffect(() => {
    fetchReceivedFriendRequestsList().then((r) => setFriendRequestList(r));
  }, []);

  const handleClick = async (action, requestId) => {
    setFriendRequestList((prev) => removeItemFromList(prev, requestId));
    await actionFriendRequest(action, requestId);
  };

  return friendRequestList ? (
    <>
      {friendRequestList.map((item, index) => (
        <FriendRequest
          key={index}
          fromPage="inbox"
          requestId={item._id}
          username={item.from.username}
          email={item.from.email}
          avatarURL={item.from.avatarURL}
          status={item.status}
          onClickAction={handleClick}
        />
      ))}
    </>
  ) : (
    <Spinner />
  );
}
