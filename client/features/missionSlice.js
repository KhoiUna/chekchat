import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import removeItemFromList from "../helpers/removeItemFromList";
import MissionsUtil from "../utils/MissionsUtil";

//Async thunk
export const loadMissionRequestsListAsync = createAsyncThunk(
  "missions/loadMissionRequestsList",
  async () => await MissionsUtil.fetchMissionRequestsList("to")
);

export const loadMissionTodoListAsync = createAsyncThunk(
  "missions/loadMissionTodoList",
  async () => await MissionsUtil.fetchMissionTodoList()
);

//Slice
export const missionSlice = createSlice({
  name: "missions",
  initialState: {
    missionRequestsList: [],
    initMissionTodoList: [],
    missionTodoList: [],
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
    sortMissionTodoList: (state, action) => {
      const status = action.payload;
      if (status === "None") {
        state.missionTodoList = state.initMissionTodoList;
      }

      if (status === "Starred") {
        state.missionTodoList = state.missionTodoList.sort(
          (a, b) => b.starred - a.starred
        );
      }

      if (status === "Completed") {
        state.missionTodoList = state.missionTodoList.sort(
          (a, b) => b.completed - a.completed
        );
      }
    },
    updateMissionTodoList: (state, action) => {
      const { id, updateAction, value } = action.payload;

      state.missionTodoList = state.missionTodoList.map((i) => {
        if (i._id === id) {
          if (updateAction === "check") i.completed = value;
          if (updateAction === "star") i.starred = value;
        }
        return i;
      });

      state.initMissionTodoList = state.initMissionTodoList.map((i) => {
        if (i._id === id) {
          if (updateAction === "check") i.completed = value;
          if (updateAction === "star") i.starred = value;
        }
        return i;
      });
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
    //
    //
    [loadMissionTodoListAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.failedToLoad = false;
    },
    [loadMissionTodoListAsync.fulfilled]: (state, action) => {
      state.initMissionTodoList = action.payload;
      state.missionTodoList = action.payload;

      state.isLoading = false;
      state.failedToLoad = false;
    },
    [loadMissionTodoListAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.failedToLoad = true;
    },
  },
});

export const { replyMission, sortMissionTodoList, updateMissionTodoList } =
  missionSlice.actions;
export default missionSlice.reducer;

//Selectors
export const selectIsLoading = (state) => state.missions.isLoading;
export const selectMissionRequestsList = (state) =>
  state.missions.missionRequestsList;
export const selectMissionTodoList = (state) => state.missions.missionTodoList;
