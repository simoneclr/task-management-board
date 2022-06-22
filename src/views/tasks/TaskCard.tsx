import { EntityId } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { selectTaskById } from "../../store/tasks/tasksSlice";

interface TaskCardProps {
	taskId: EntityId;
}

// Displays a Card with a task information
function TaskCard({taskId}: TaskCardProps) {

	const task = useSelector((state: RootState) => selectTaskById(state, taskId))

	return (
		task ?

		<li className="bg-slate-50 p-4 rounded-sm shadow">
			{task.name}
		</li>

		:
		
		null
	)
}

export default TaskCard
