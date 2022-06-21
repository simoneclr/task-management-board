enum TaskStatus {
	PLANNED = "Planned", 
	DOING = "Doing",
	DONE = "Done"
}

interface SubTask {
	id: number;
	name: string;
	isDone: boolean;
}

interface Task {
	id: string;
	name: string;
	description: string;
	status: TaskStatus;
	subtasks?: SubTask[];
}

export {
	TaskStatus
}

export type {
	SubTask,
	Task
}
