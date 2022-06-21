import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter<string>()

const tasksSlice = createSlice({
	name: "tasks",
	initialState: tasksAdapter.getInitialState(),
	reducers: {}
})

export default tasksSlice.reducer
