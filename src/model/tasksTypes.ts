enum TaskStatus {
	PLANNED = "Planned", 
	DOING = "Doing",
	DONE = "Done"
}

interface SubTask {
	id: string;
	name: string;
	isDone: boolean;
	parentTaskId: string;
}

interface Task {
	id: string;
	name: string;
	description: string;
	status: TaskStatus;
	parentBoardId: string;
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
