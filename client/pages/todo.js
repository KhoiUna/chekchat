import MainLayout from "../containers/main_layout";
import MissionCheckbox from "../components/todo/mission_checkbox";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import { fetchMissionTodoList } from "../utils/Missions";
import SortButton from "../components/todo/sort_button";

export default function Todo() {
  const [missionTodoList, setMissionTodoList] = useState([]);
  useEffect(() => {
    fetchMissionTodoList().then((r) => setMissionTodoList(r));
  }, []);

  return (
    <MainLayout componentName="Todo">
      <SortButton />

      <Grid container direction="column" justify="center" alignItems="center">
        {missionTodoList.map((i) => (
          <MissionCheckbox
            completed={i.completed}
            subject={i.subject}
            due_date={i.due_date}
            username={i.from.username}
            missionId={i._id}
          />
        ))}
      </Grid>
    </MainLayout>
  );
}
