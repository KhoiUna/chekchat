import { useEffect, useState } from "react";
import FriendTag from "../../components/friends/friend_tag";
import { fetchFriendList } from "../../utils/Friends";
import utilStyles from "../../styles/utils.module.css";

export default function FriendList() {
  const [friendList, setFriendList] = useState(null);
  useEffect(() => {
    fetchFriendList().then((r) => setFriendList(r));
  }, []);

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
    <p className={utilStyles.responseText}>Loading...</p>
  );
}
