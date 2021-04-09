import { useEffect, useState } from "react";
import FriendTag from "../../components/friends/friend_tag";
import { fetchFriendList } from "../../utils/Friends";
import Spinner from "../../components/spinner";
import FriendBlankState from "../../components/friends/friend_blank_state";

export default function FriendList() {
  const [friendList, setFriendList] = useState(null);
  useEffect(() => {
    fetchFriendList().then((r) => setFriendList(r));
  }, []);

  if (friendList?.length === 0) return <FriendBlankState />;

  return friendList ? (
    <>
      {friendList.map((item) => (
        <FriendTag
          username={item.friend.username}
          email={item.friend.email}
          avatarURL={item.friend.avatarURL}
        />
      ))}
    </>
  ) : (
    <Spinner />
  );
}
