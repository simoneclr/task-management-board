import { nanoid } from "@reduxjs/toolkit";

import { Task, TaskStatus } from "../model/tasksTypes";

const mockTasks: Task[] = [
	{
		id: nanoid(),
		name: "Build settings UI",
		description: "lorem ipsum yada yada yada",
		status: TaskStatus.PLANNED
	},
	{
		id: nanoid(),
		name: "Build user profile UI",
		description: "lorem ipsum yada yada yada",
		status: TaskStatus.PLANNED
	},
	{
		id: nanoid(),
		name: "Build Log-in flow",
		description: "lorem ipsum yada yada yada",
		status: TaskStatus.DOING
	},
	{
		id: nanoid(),
		name: "Market research",
		description: "lorem ipsum yada yada yada",
		status: TaskStatus.DONE
	}
]

const getMockTasks = () => {
	let res:{
		ids: string[],
		entities: {[id: string]: Task | undefined}
	} = {
		ids: mockTasks.map(task => task.id),
		entities: {}
	}

	mockTasks.forEach(task => {
		res.entities[task.id] = task
	})

	return res
}

export { getMockTasks }
