import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { Task } from "../../model/tasksTypes";

const tasksAdapter = createEntityAdapter<Task>({})

const tasksSlice = createSlice({
	name: "tasks",
	initialState: tasksAdapter.getInitialState(),
	reducers: {}
})

export default tasksSlice.reducer
