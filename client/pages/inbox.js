import MainLayout from "../containers/main_layout";
import Grid from "@material-ui/core/Grid";
import RefreshButton from "../components/refresh_button";
import { useEffect, useState, Fragment } from "react";
import InboxMissionRequest from "../components/inbox/inbox_mission_request";
import Spinner from "../components/spinner";
import Typography from "@material-ui/core/Typography";
import {
  loadMissionRequestsListAsync,
  replyMission,
  selectIsLoading,
  selectMissionRequestsList,
} from "../features/missionSlice";
import { useDispatch, useSelector } from "react-redux";
import { launched } from "../config/config";

export default function Inbox({}) {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const missionRequestList = useSelector(selectMissionRequestsList);
  useEffect(() => {
    dispatch(loadMissionRequestsListAsync());
  }, []);

  const handleClick = (action, requestId) => {
    dispatch(replyMission({ action, requestId }));
  };

  const refresh = () => {
    dispatch(loadMissionRequestsListAsync());
  };

  if (isLoading)
    return (
      <MainLayout componentName="Inbox">
        <RefreshButton refresh={refresh} />

        <Spinner />
      </MainLayout>
    );

  if (missionRequestList.length === 0)
    return (
      <MainLayout componentName="Inbox">
        <RefreshButton refresh={refresh} />

        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: "10%" }}
          component="p"
        >
          <i>You have no task requests here!</i>
        </Typography>
      </MainLayout>
    );

  return (
    <MainLayout componentName="Inbox">
      <RefreshButton refresh={refresh} />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "5rem" }}
      >
        {missionRequestList.map((i, index) => (
          <Fragment key={index}>
            <InboxMissionRequest
              key={index}
              requestId={i._id}
              username={i.from_user[0].username}
              subject={i.subject}
              onClickAction={handleClick}
            />
          </Fragment>
        ))}
      </Grid>
    </MainLayout>
  );
}
