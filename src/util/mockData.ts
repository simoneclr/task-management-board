import { nanoid } from "@reduxjs/toolkit";

import { Task, TaskBoard, TaskStatus } from "../model/tasksTypes";

const mockBoards: TaskBoard[] = [
	{
		id: nanoid(),
		name: "First Board"
	},
	{
		id: nanoid(),
		name: "Second Board"
	}
]

const mockTasks: Task[] = [
	{
		id: nanoid(),
		name: "Build settings UI",
		description: "lorem ipsum yada yada yada",
		status: TaskStatus.PLANNED,
		parentBoardId: mockBoards[0].id
	},
	{
		id: nanoid(),
		name: "Build user profile UI",
		description: "lorem ipsum yada yada yada",
		status: TaskStatus.PLANNED,
		parentBoardId: mockBoards[0].id
	},
	{
		id: nanoid(),
		name: "Build Log-in flow",
		description: "lorem ipsum yada yada yada",
		status: TaskStatus.DOING,
		parentBoardId: mockBoards[0].id
	},
	{
		id: nanoid(),
		name: "Market research",
		description: "lorem ipsum yada yada yada",
		status: TaskStatus.DONE,
		parentBoardId: mockBoards[0].id
	}
]

const getMockTasks = () => {
	let res: {
		ids: string[],
		entities: {[id: string]: Task}
	} = {
		ids: mockTasks.map(task => task.id),
		entities: {}
	}

	mockTasks.forEach(task => {
		res.entities[task.id] = task
	})

	return res
}

const getMockBoards = () => {
	let res: {
		ids: string[],
		entities: {[id: string]: TaskBoard}
	} = {
		ids: mockBoards.map(board => board.id),
		entities: {}
	}

	mockBoards.forEach(board => {
		res.entities[board.id] = board
	})

	return res
}

export { getMockTasks, getMockBoards }
