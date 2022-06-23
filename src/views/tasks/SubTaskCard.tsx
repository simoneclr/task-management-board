import { EntityId } from "@reduxjs/toolkit";
import { SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { selectSubTaskById, subTaskCompleted } from "../../store/subTasks/subTasksSlice";

interface SubTaskCardProps {
	subTaskId: EntityId;
}

// Displays a card for a single subTask
function SubTaskCard({subTaskId}: SubTaskCardProps) {

	const dispatch = useAppDispatch()

	const subTask = useAppSelector(state => selectSubTaskById(state, subTaskId))

	const onCompleteClick = (e: SyntheticEvent) => {
		e.stopPropagation()

		dispatch(subTaskCompleted(subTaskId))
	}

	return (
		subTask ?

		<li className="p-2 bg-slate-200 rounded-sm flex justify-between items-center">
			<span className={(subTask.isDone ? "line-through" : "")}>				
				{subTask.name}
			</span>

			{ !subTask.isDone &&
				
				<button onClick={e => onCompleteClick(e)} className="text-sm hover:text-blue-500">
					<span className="sr-only">Mark as complete</span>
					Complete
				</button>
			}
		</li>

		: null
	)
}

export default SubTaskCard
