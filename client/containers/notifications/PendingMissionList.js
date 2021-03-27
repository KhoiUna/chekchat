import { useEffect, useState } from "react";
import { fetchMissionRequestsList } from "../../utils/Missions";
import MissionRequest from "../../components/notifications/mission_request";
import removeItemFromList from "../../helpers/removeItemFromList";

export default function PendingMissionList({}) {
  const [missionRequestList, setMissionRequestList] = useState([]);
  useEffect(() => {
    fetchMissionRequestsList("to").then((r) => {
      console.log(r);
      setMissionRequestList(r);
    });
  }, []);

  const handleClick = async (requestId) => {
    // const res = await actionFriendRequest(action, requestId);
    console.log(requestId);
  };

  return (
    <>
      {missionRequestList.map((i) => (
        <MissionRequest
          requestId={i._id}
          username={i.from.username}
          subject={i.subject}
          onClickAction={handleClick}
        />
      ))}
    </>
  );
}
