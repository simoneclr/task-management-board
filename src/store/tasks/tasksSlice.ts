import { AnyAction, createEntityAdapter, createSelector, createSlice, EntityId, nanoid, PayloadAction, ThunkAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { SubTask, Task, TaskStatus } from "../../model/tasksTypes";
import { subTaskAdded } from "../subTasks/subTasksSlice";

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
	taskAdded
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
