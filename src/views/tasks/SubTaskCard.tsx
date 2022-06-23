import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store/hooks";

import { selectSubTaskById } from "../../store/subTasks/subTasksSlice";

interface SubTaskCardProps {
	subTaskId: EntityId;
}

// Displays a card for a single subTask
function SubTaskCard({subTaskId}: SubTaskCardProps) {

	const subTask = useAppSelector(state => selectSubTaskById(state, subTaskId))

	return (
		subTask ?

		<li className={(subTask.isDone ? "line-through " : " ") + "p-2 bg-slate-200 rounded-sm"}>
			{subTask.name}
		</li>

		: null
	)
}

export default SubTaskCard
