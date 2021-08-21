import MainLayout from "../containers/main_layout";
import Grid from "@material-ui/core/Grid";
import PendingMissionList from "../containers/inbox/PendingMissionList";
import RefreshButton from "../components/refresh_button";

export default function Inbox({}) {
  return (
    <MainLayout componentName="Inbox">
      <RefreshButton />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: "5rem" }}
      >
        <PendingMissionList />
      </Grid>
    </MainLayout>
  );
}
