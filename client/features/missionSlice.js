import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import removeItemFromList from "../helpers/removeItemFromList";
import MissionsUtil from "../utils/MissionsUtil";

//Async thunk
export const loadMissionRequestsListAsync = createAsyncThunk(
  "missions/loadMissionRequestsList",
  async () => await MissionsUtil.fetchMissionRequestsList("to")
);

//Slice
export const missionSlice = createSlice({
  name: "missions",
  initialState: {
    missionRequestsList: null,
    isLoading: false,
    failedToLoad: false,
  },
  reducers: {
    replyMission: (state, action) => {
      const { requestId } = action.payload;
      state.missionRequestsList = removeItemFromList(
        state.missionRequestsList,
        requestId
      );
    },
  },
  extraReducers: {
    [loadMissionRequestsListAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadMissionRequestsListAsync.fulfilled]: (state, action) => {
      state.missionRequestsList = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadMissionRequestsListAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
  },
});

export const { replyMission } = missionSlice.actions;
export default missionSlice.reducer;

//Selectors
export const selectIsLoading = (state) => state.missions.isLoading;
export const selectMissionRequestsList = (state) =>
  state.missions.missionRequestsList;
