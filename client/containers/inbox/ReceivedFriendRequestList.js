import { useEffect, Fragment } from "react";
import FriendRequest from "../../components/friends/friend_request";
import removeItemFromList from "../../helpers/removeItemFromList";
import Spinner from "../../components/spinner";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  loadReceivedFriendRequestsListAsync,
  selectFriendRequestList,
  replyFriendRequest,
  selectIsLoading,
} from "../../features/friendSlice";

export default function ReceivedFriendRequestList() {
  const dispatch = useDispatch();

  const friendRequestList = useSelector(selectFriendRequestList);
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(loadReceivedFriendRequestsListAsync());
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleClick = (action, requestId) => {
    dispatch(replyFriendRequest({ action, requestId }));
  };

  if (isLoading) return <Spinner />;

  if (friendRequestList.length === 0)
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

  return (
    <>
      {friendRequestList.map((item, index) => (
        <Fragment key={index}>
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
        </Fragment>
      ))}
    </>
  );
}
