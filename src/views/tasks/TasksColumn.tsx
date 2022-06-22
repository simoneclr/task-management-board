import { EntityId } from "@reduxjs/toolkit"

import TaskCard from "./TaskCard";

interface TasksColumnProps {
	name: string;
	tasksIds: EntityId[];
}

// Displays a column of tasks from the task board
function TasksColumn({name, tasksIds}: TasksColumnProps) {
	return (
		<div>
			<h2 className="text-2xl mb-4">
				{name}
			</h2>

			<ul className="flex flex-col gap-4">
				{tasksIds.map(id => <TaskCard key={id} taskId={id}/>)}
			</ul>
		</div>		
	)
}

export default TasksColumn
