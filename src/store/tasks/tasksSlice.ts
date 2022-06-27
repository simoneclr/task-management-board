import { createEntityAdapter, createSelector, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";

import { Task, TaskStatus } from "../../model/tasksTypes";
import { RootState } from "../store";

const tasksAdapter = createEntityAdapter<Task>({})

const tasksSlice = createSlice({
	name: "tasks",
	initialState: tasksAdapter.getInitialState(),
	reducers: {
		taskCompleted: {
			reducer: (
				state,
				action: PayloadAction<{taskId: EntityId}>
			) => {
				const {taskId} = action.payload

				const task = state.entities[taskId]

				if (task) {
					task.status = TaskStatus.DONE
				}
			},
			prepare: (taskId: EntityId) => {
				return {
					payload: {
						taskId
					}
				}
			}
		},
		taskStarted: {
			reducer: (
				state,
				action: PayloadAction<{taskId: EntityId}>
			) => {
				const {taskId} = action.payload

				const task = state.entities[taskId]

				if (task) {
					task.status = TaskStatus.DOING
				}
			},
			prepare: (taskId: EntityId) => {
				return {
					payload: {
						taskId
					}
				}
			}
		}
	}
})

export default tasksSlice.reducer

export const {
	taskCompleted,
	taskStarted
} = tasksSlice.actions

export const {
	selectAll: selectAllTasks,
	selectById: selectTaskById
} = tasksAdapter.getSelectors((state: RootState) => state.tasks)

// Select all tasks belonging to a specified board
export const selectTasksIdsByBoardIds = createSelector(
	[
		selectAllTasks,
		(state: RootState, boardId:EntityId) => boardId
	],
	(tasks, boardId) => tasks.filter(task => task.parentBoardId === boardId).map(task => task.id)
)

export const selectTaskStatusByTaskId = createSelector(
	[
		(state: RootState, taskId: EntityId) => selectTaskById(state, taskId)
	],
	task => task ? task.status : undefined
)

// Select planned tasks belonging to a specified board
export const selectPlannedTasksIdsByBoardIds = createSelector(
	[
		selectAllTasks,
		(state: RootState, boardId:EntityId) => boardId
	],
	(tasks, boardId) => tasks.filter(task => 
		task.parentBoardId === boardId && task.status === TaskStatus.PLANNED
	).map(task => task.id)
)

// Select in-progress tasks belonging to a specified board
export const selectDoingTasksIdsByBoardIds = createSelector(
	[
		selectAllTasks,
		(state: RootState, boardId:EntityId) => boardId
	],
	(tasks, boardId) => tasks.filter(
		task => task.parentBoardId === boardId && task.status === TaskStatus.DOING
	).map(task => task.id)
)

// Select completed tasks belonging to a specified board
export const selectDoneTasksIdsByBoardIds = createSelector(
	[
		selectAllTasks,
		(state: RootState, boardId:EntityId) => boardId
	],
	(tasks, boardId) => tasks.filter(
		task => task.parentBoardId === boardId && task.status === TaskStatus.DONE
	).map(task => task.id)
)
