import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { TaskBoard } from "../../model/tasksTypes";

const boardsAdapter = createEntityAdapter<TaskBoard>({})

const boardsSlice = createSlice({
	name: "boards",
	initialState: boardsAdapter.getInitialState(),
	reducers: {}
})

export default boardsSlice.reducer

export const {
	selectIds: selectAllBoardsIds,
	selectById: selectBoardById
} = boardsAdapter.getSelectors((state: RootState) => state.boards)
