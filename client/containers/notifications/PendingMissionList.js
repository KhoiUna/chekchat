import { useEffect, useState } from "react";
import { fetchMissionRequestsList } from "../../utils/Missions";
import MissionRequest from "../../components/notifications/mission_request";

export default function PendingMissionList({}) {
  const [missionRequestList, setMissionRequestList] = useState([]);
  useEffect(() => {
    fetchMissionRequestsList("to").then((r) => setMissionRequestList(r));
  }, []);

  return (
    <>
      {missionRequestList.map((i, index) => (
        <MissionRequest
          key={index}
          requestId={i._id}
          username={i.from.username}
          subject={i.subject}
        />
      ))}
    </>
  );
}
