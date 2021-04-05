import { useEffect, useState } from "react";
import {
  fetchMissionRequestsList,
  actionMissionRequest,
} from "../../utils/Missions";
import removeItemFromList from "../../helpers/removeItemFromList";
import InboxMissionRequest from "../../components/inbox/inbox_mission_request";
import Spinner from "../../components/spinner";

export default function PendingMissionList({}) {
  const [missionRequestList, setMissionRequestList] = useState(null);
  useEffect(() => {
    fetchMissionRequestsList("to").then((r) => setMissionRequestList(r));
  }, []);

  const handleClick = async (action, requestId) => {
    await actionMissionRequest(action, requestId);
    setMissionRequestList((prev) => removeItemFromList(prev, requestId));
  };

  return missionRequestList ? (
    <>
      {missionRequestList.map((i, index) => (
        <InboxMissionRequest
          key={index}
          requestId={i._id}
          username={i.from.username}
          subject={i.subject}
          onClickAction={handleClick}
        />
      ))}
    </>
  ) : (
    <Spinner />
  );
}
