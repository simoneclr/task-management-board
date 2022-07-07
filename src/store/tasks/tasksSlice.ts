import { AnyAction, createEntityAdapter, createSelector, createSlice, EntityId, nanoid, PayloadAction, ThunkAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { SubTask, Task, TaskStatus } from "../../model/tasksTypes";
import { subTaskAdded, subTaskEdited, subTaskRemoved } from "../subTasks/subTasksSlice";

// Thunk function that adds a new Task and its relative SubTasks
export const addTask = (
	parentBoardId: EntityId, 
	taskName: string, 
	taskDescription: string,
	subTasks: SubTask[]
): ThunkAction<void, RootState, unknown, AnyAction> => 
(dispatch, getState) => {
	const taskId = nanoid()

	dispatch(taskAdded(parentBoardId, taskId, taskName, taskDescription))

	subTasks.forEach(subTask => {
		dispatch(subTaskAdded(taskId, subTask.name))
	})
}

// Thunk function that edits an existing Task and its relative SubTasks
export const editTask = (
	taskId: EntityId, 
	updatedName: string, 
	updatedDescription: string,
	subTasks: SubTask[],
	removedSubTasks: SubTask[]
): ThunkAction<void, RootState, unknown, AnyAction> => 
(dispatch, getState) => {
	dispatch(taskEdited(taskId, updatedName, updatedDescription))

	subTasks.forEach(subTask => {
		const existingSubTask = getState().subTasks.entities[subTask.id]

		if (existingSubTask && existingSubTask.parentTaskId === taskId) {
			dispatch(subTaskEdited(existingSubTask.id, subTask.name))
		} else {
			dispatch(subTaskAdded(taskId, subTask.name))
		}
	})

	removedSubTasks.forEach(subTask => {
		dispatch(subTaskRemoved(subTask.id))
	})
}

const tasksAdapter = createEntityAdapter<Task>({})

const tasksSlice = createSlice({
	name: "tasks",
	initialState: tasksAdapter.getInitialState(),
	reducers: {
		taskAdded: {
			reducer: (
				state,
				action: PayloadAction<{
					parentBoardId: EntityId,
					taskId: EntityId,
					taskName: string,
					taskDescription: string
				}>
			) => {
				const {parentBoardId, taskId, taskName, taskDescription} = action.payload

				const newTask: Task = {
					id: taskId.toString(),
					name: taskName,
					description: taskDescription,
					status: TaskStatus.PLANNED,
					parentBoardId: parentBoardId.toString()
				}

				tasksAdapter.addOne(state, newTask)
			},
			prepare: (parentBoardId: EntityId, taskId, taskName: string, taskDescription: string) => {
				return {
					payload: {
						parentBoardId,
						taskId,
						taskName,
						taskDescription
					}
				}
			}
		},
		taskEdited: {
			reducer: (
				state,
				action: PayloadAction<{
					taskId: EntityId,
					updatedName: string,
					updatedDescription: string
				}>
			) => {
				const {taskId, updatedName, updatedDescription} = action.payload

				const existingTask = state.entities[taskId]

				if (existingTask) {
					existingTask.name = updatedName
					existingTask.description = updatedDescription
				}
			},
			prepare: (taskId, updatedName: string, updatedDescription: string) => {
				return {
					payload: {
						taskId,
						updatedName,
						updatedDescription
					}
				}
			}
		},
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

// Actions not exported because accessed by thunks
const {
	taskAdded,
	taskEdited
} = tasksSlice.actions

// Exported actions
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
