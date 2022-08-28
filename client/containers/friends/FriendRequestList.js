import { useEffect, Fragment } from "react";
import FriendRequest from "../../components/friends/friend_request";
import Spinner from "../../components/spinner";
import FriendBlankState from "../../components/friends/friend_blank_state";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import {
  loadReceivedFriendRequestsListAsync,
  selectFriendRequestList,
  replyFriendRequest,
  selectIsLoading,
} from "../../features/friendSlice";

export default function FriendRequestList() {
  const dispatch = useDispatch();

  const friendRequestList = useSelector(selectFriendRequestList);
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(loadReceivedFriendRequestsListAsync());
  }, []);

  const handleClick = (action, requestId) => {
    dispatch(replyFriendRequest({ action, requestId }));
  };

  if (isLoading) return <Spinner />;

  if (friendRequestList?.length === 0)
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "5rem" }}
      >
        <FriendBlankState fromContainer="FriendRequestList" />
      </Grid>
    );

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ marginBottom: "5rem" }}
    >
      {friendRequestList.map((item, index) => (
        <Fragment key={index}>
          <FriendRequest
            key={index}
            requestId={item._id}
            username={item.from_user[0].username}
            email={item.from_user[0].email}
            avatarURL={item.from_user[0].avatarURL}
            onClickAction={handleClick}
          />
        </Fragment>
      ))}
    </Grid>
  );
}
