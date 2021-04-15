import { useState, useEffect } from "react";
import FriendRequest from "../../components/friends/friend_request";
import { fetchReceivedFriendRequestsList } from "../../utils/FriendRequest";
import removeItemFromList from "../../helpers/removeItemFromList";
import Spinner from "../../components/spinner";
import io from "socket.io-client";
import { origin } from "../../config/config";
import Typography from "@material-ui/core/Typography";

let socket;
export default function ReceivedFriendRequestList() {
  const [friendRequestList, setFriendRequestList] = useState(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchReceivedFriendRequestsList().then((r) => setFriendRequestList(r));
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    socket = io(origin, {
      withCredentials: true,
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const handleClick = async (action, requestId) => {
    setFriendRequestList((prev) => removeItemFromList(prev, requestId));
    socket.emit("friend requests", { action, requestId });
  };

  if (friendRequestList?.length === 0)
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginTop: "10%" }}
        component="p"
      >
        <i>You have no friend requests here!</i>
      </Typography>
    );

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
