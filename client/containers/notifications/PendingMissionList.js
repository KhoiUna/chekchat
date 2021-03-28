import { useEffect, useState } from "react";
import {
  fetchMissionRequestsList,
  actionMissionRequest,
} from "../../utils/Missions";
import removeItemFromList from "../../helpers/removeItemFromList";
import NotificationsMissionRequest from "../../components/notifications/notifications_mission_request";

export default function PendingMissionList({}) {
  const [missionRequestList, setMissionRequestList] = useState([]);
  useEffect(() => {
    fetchMissionRequestsList("to").then((r) => setMissionRequestList(r));
  }, []);

  const [change, setChange] = useState(false);
  const handleClick = async (action, requestId) => {
    const res = await actionMissionRequest(action, requestId);
    setChange(!change);
    setMissionRequestList((prev) => removeItemFromList(prev, requestId));
  };

  return (
    <>
      {missionRequestList.map((i, index) => (
        <NotificationsMissionRequest
          key={index}
          requestId={i._id}
          username={i.from.username}
          subject={i.subject}
          onClickAction={handleClick}
        />
      ))}
    </>
  );
}
