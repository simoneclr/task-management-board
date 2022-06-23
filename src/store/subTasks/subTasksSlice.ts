import { createEntityAdapter, createSelector, createSlice, EntityId } from "@reduxjs/toolkit";

import { SubTask } from "../../model/tasksTypes";
import { RootState } from "../store";

const subTasksAdapter = createEntityAdapter<SubTask>()

const subTasksSlice = createSlice({
	name: "subTasks",
	initialState: subTasksAdapter.getInitialState(),
	reducers: {}
})

export default subTasksSlice.reducer

export const {
	selectById: selectSubTaskById,
	selectAll: selectAllSubTasks
} = subTasksAdapter.getSelectors((state: RootState) => state.subTasks)

// Given a task id, select the ids of all subTasks belonging to it
export const selectSubTasksIdsByTaskId = createSelector(
	[
		selectAllSubTasks,
		(state: RootState, taskId: EntityId) => taskId
	],
	(subTasks, taskId) => subTasks.filter(
		subTask => subTask.parentTaskId === taskId
	).map(subTask => subTask.id)
)

// Given a task id, select the count of completed subTasks belongign to that task
export const selectCompletedSubTasksByTaskId = createSelector(
	[
		selectAllSubTasks,
		(state: RootState, taskId: EntityId) => taskId
	],
	(subTasks, taskId) => subTasks.filter(
		subTask => subTask.parentTaskId === taskId
	).reduce((sum, subTask) => sum += subTask.isDone ? 1 : 0, 0)
)