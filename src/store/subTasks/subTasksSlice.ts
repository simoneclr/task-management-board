import { createEntityAdapter, createSelector, createSlice, EntityId, nanoid, PayloadAction } from "@reduxjs/toolkit";

import { SubTask } from "../../model/tasksTypes";
import { RootState } from "../store";

const subTasksAdapter = createEntityAdapter<SubTask>()

const subTasksSlice = createSlice({
	name: "subTasks",
	initialState: subTasksAdapter.getInitialState(),
	reducers: {
		subTaskAdded: {
			reducer: (
				state, 
				action: PayloadAction<{
					parentTaskId: EntityId,
					name: string
				}>
			) => {
				const {parentTaskId, name} = action.payload

				const newSubTask: SubTask = {
					id: nanoid(),
					parentTaskId: parentTaskId.toString(),
					name,
					isDone: false
				}

				if (newSubTask.name !== "") {
					subTasksAdapter.addOne(state, newSubTask)
				}
			},
			prepare: (parentTaskId: EntityId, name: string) => {
				return {
					payload: {
						parentTaskId,
						name
					}
				}
			} 
		},
		subTaskCompleted: {
			reducer: (
				state, 
				action: PayloadAction<{subTaskId: EntityId}>
			) => {
				const {subTaskId} = action.payload

				const subTask = state.entities[subTaskId]

				if (subTask) {
					subTask.isDone = true
				}
			},
			prepare: (subTaskId: EntityId) => {
				return {
					payload: {
						subTaskId
					}
				}
			} 
		}
	}
})

export default subTasksSlice.reducer

export const {
	subTaskAdded,
	subTaskCompleted
} = subTasksSlice.actions

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

// Given a task id, check if all of its subtasks have been completed
export const selectCanCompleteTaskId = createSelector(
	[
		selectAllSubTasks,
		(state: RootState, taskId: EntityId) => taskId
	],
	(subTasks, taskId) => subTasks.filter(
		subTask => subTask.parentTaskId === taskId
	).reduce((allDone, subTask) => allDone && subTask.isDone, true)
)
