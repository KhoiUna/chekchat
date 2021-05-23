import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InboxMissionRequest from "../../components/inbox/inbox_mission_request";
import Spinner from "../../components/spinner";
import Typography from "@material-ui/core/Typography";
import {
  loadMissionRequestsListAsync,
  replyMission,
  selectIsLoading,
  selectMissionRequestsList,
} from "../../features/missionSlice";

export default function PendingMissionList({}) {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const missionRequestList = useSelector(selectMissionRequestsList);
  useEffect(() => {
    dispatch(loadMissionRequestsListAsync());
  }, []);

  const handleClick = (action, requestId) => {
    dispatch(replyMission({ action, requestId }));
  };

  if (isLoading) return <Spinner />;

  if (missionRequestList.length === 0)
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginTop: "10%" }}
        component="p"
      >
        <i>You have no task requests here!</i>
      </Typography>
    );

  return (
    <>
      {missionRequestList.map((i, index) => (
        <Fragment key={index}>
          <InboxMissionRequest
            key={index}
            requestId={i._id}
            username={i.from.username}
            subject={i.subject}
            onClickAction={handleClick}
          />
        </Fragment>
      ))}
    </>
  );
}
