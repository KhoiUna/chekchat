import MainLayout from "../containers/main_layout";
import MissionCheckbox from "../components/todo/mission_checkbox";
import Grid from "@material-ui/core/Grid";
import { Fragment, useEffect } from "react";
import SortButton from "../components/todo/sort_button";
import Spinner from "../components/spinner";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMissionTodoListAsync,
  selectIsLoading,
  selectMissionTodoList,
  sortMissionTodoList,
  updateMissionTodoList,
} from "../features/missionSlice";
import UsersUtil from "../utils/UsersUtil";

export default function Todo({ userInfo }) {
  const dispatch = useDispatch();

  const missionTodoList = useSelector(selectMissionTodoList);
  const isLoading = useSelector(selectIsLoading);
  useEffect(() => {
    dispatch(loadMissionTodoListAsync());
  }, []);

  const updateMissionState = (id, action, value) => {
    dispatch(updateMissionTodoList({ id, updateAction: action, value }));
  };

  const sortTodoList = (status) => {
    dispatch(sortMissionTodoList(status));
  };

  if (isLoading)
    return (
      <MainLayout
        componentName="Todo"
        userInfo={userInfo}
        notificationCount={notificationCount}
      >
        <SortButton sortTodoList={sortTodoList} />
        <Spinner />
      </MainLayout>
    );

  if (missionTodoList.length === 0)
    return (
      <MainLayout
        componentName="Todo"
        userInfo={userInfo}
        notificationCount={notificationCount}
      >
        <SortButton sortTodoList={sortTodoList} />
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: "10%" }}
        >
          <i>You have no tasks to do here!</i>
        </Typography>
      </MainLayout>
    );

  return (
    <MainLayout
      componentName="Todo"
      userInfo={userInfo}
      notificationCount={notificationCount}
    >
      <SortButton sortTodoList={sortTodoList} />
      <Grid container direction="column" justify="center" alignItems="center">
        {missionTodoList.map((i) => (
          <Fragment key={i._id}>
            <MissionCheckbox
              completed={i.completed}
              starred={i.starred}
              subject={i.subject}
              due_date={i.due_date}
              username={i.from.username}
              missionId={i._id}
              updateMissionState={updateMissionState}
            />
          </Fragment>
        ))}
      </Grid>
    </MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const cookieObj = ctx.res.req.cookies;

  const userInfo = await UsersUtil.fetchUserInfoServerSide(cookieObj);

  return {
    props: { userInfo },
  };
}
