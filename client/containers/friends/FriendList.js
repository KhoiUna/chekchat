import { Fragment, useEffect, useState } from "react";
import FriendTag from "../../components/friends/friend_tag";
import FriendsUtil from "../../utils/FriendsUtil";
import Spinner from "../../components/spinner";
import FriendBlankState from "../../components/friends/friend_blank_state";
import Grid from "@material-ui/core/Grid";
import {
  loadFriendListAsync,
  selectFriendList,
  selectIsLoading,
} from "../../features/friendSlice";
import { useSelector, useDispatch } from "react-redux";

export default function FriendList() {
  const dispatch = useDispatch();

  const friendList = useSelector(selectFriendList);
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(loadFriendListAsync());
  }, []);

  if (isLoading) return <Spinner />;

  if (friendList?.length === 0)
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "5rem" }}
      >
        <FriendBlankState fromContainer="FriendList" />
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
      {friendList.map((item, index) => (
        <Fragment key={index}>
          <FriendTag
            username={item.friend[0].username}
            email={item.friend[0].email}
            avatarURL={item.friend[0].avatarURL}
          />
        </Fragment>
      ))}
    </Grid>
  );
}
