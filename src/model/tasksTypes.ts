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
	parentBoardId: string;
	subtasks?: SubTask[];
}

interface TaskBoard {
	id: string;
	name: string;
}

export {
	TaskStatus
}

export type {
	SubTask,
	Task,
	TaskBoard
}
