import MainLayout from "../containers/main_layout";
import MissionCheckbox from "../components/todo/mission_checkbox";
import Grid from "@material-ui/core/Grid";
import { Fragment, useEffect, useState } from "react";
import { fetchMissionTodoList } from "../utils/Missions";
import SortButton from "../components/todo/sort_button";
import io from "socket.io-client";
import { origin } from "../config/config";
import Spinner from "../components/spinner";
import Typography from "@material-ui/core/Typography";

let socket;
export default function Todo() {
  useEffect(() => {
    socket = io(origin, {
      withCredentials: true,
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const [missionTodoList, setMissionTodoList] = useState(null);
  const [sortedTodoList, setSortedTodoList] = useState(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchMissionTodoList().then((r) => {
        setMissionTodoList(r);
        setSortedTodoList(r);
      });
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const updateMissionState = (id, action, value) => {
    setSortedTodoList((prev) =>
      [...prev].map((i) => {
        if (i._id === id) {
          if (action === "check") i.completed = value;
          if (action === "star") i.starred = value;
        }

        return i;
      })
    );
  };

  const sortTodoList = (status) => {
    if (status === "None") return setSortedTodoList(missionTodoList);

    if (status === "Starred")
      return setSortedTodoList((prev) =>
        [...prev].sort((a, b) => b.starred - a.starred)
      );

    if (status === "Completed")
      return setSortedTodoList((prev) =>
        [...prev].sort((a, b) => b.completed - a.completed)
      );
  };

  return (
    <MainLayout componentName="Todo">
      <SortButton sortTodoList={sortTodoList} />

      {missionTodoList?.length === 0 && (
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: "10%" }}
        >
          <i>You have no tasks to do here!</i>
        </Typography>
      )}

      {sortedTodoList ? (
        <Grid container direction="column" justify="center" alignItems="center">
          {sortedTodoList.map((i) => (
            <Fragment key={i._id}>
              <MissionCheckbox
                completed={i.completed}
                starred={i.starred}
                subject={i.subject}
                due_date={i.due_date}
                username={i.from.username}
                missionId={i._id}
                socket={socket}
                updateMissionState={updateMissionState}
              />
            </Fragment>
          ))}
        </Grid>
      ) : (
        <Spinner />
      )}
    </MainLayout>
  );
}
