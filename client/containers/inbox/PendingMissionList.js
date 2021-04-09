import { useEffect, useState } from "react";
import { fetchMissionRequestsList } from "../../utils/Missions";
import removeItemFromList from "../../helpers/removeItemFromList";
import InboxMissionRequest from "../../components/inbox/inbox_mission_request";
import Spinner from "../../components/spinner";
import io from "socket.io-client";
import { origin } from "../../config/config";

let socket;
export default function PendingMissionList({}) {
  const [missionRequestList, setMissionRequestList] = useState(null);
  useEffect(() => {
    fetchMissionRequestsList("to").then((r) => setMissionRequestList(r));
  }, []);

  useEffect(() => {
    socket = io(origin, {
      withCredentials: true,
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const handleClick = async (action, requestId) => {
    setMissionRequestList((prev) => removeItemFromList(prev, requestId));
    socket.emit("mission requests", { action, requestId });
  };

  if (missionRequestList?.length === 0)
    return (
      <h3 style={{ marginTop: "10%" }}>
        <i>You have no task requests here!</i>
      </h3>
    );

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
