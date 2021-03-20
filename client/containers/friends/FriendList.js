import { useState } from "react";
import FriendTag from "../../components/friends/friend_tag";

export default function FriendList() {
  const [friendList, setFriendList] = useState([
    {
      username: "Placeholder",
      email: "holder@holder.com",
      avatarURL: "/img/avatar.png",
    },
  ]);

  return (
    <>
      {friendList.map((item) => (
        <FriendTag
          username={item.username}
          email={item.email}
          avatarURL={item.avatarURL}
        />
      ))}
    </>
  );
}
