import { EntityId } from "@reduxjs/toolkit"
import { useAppSelector } from "../../store/hooks"

import { selectCompletedSubTasksByTaskId, selectSubTasksIdsByTaskId } from "../../store/subTasks/subTasksSlice"

import SubTaskCard from "./SubTaskCard"

interface SubTasksListProps {
	taskId: EntityId
}

// Displays a list ob subtasks for a given task
function SubTasksList({taskId}: SubTasksListProps) {

	const subTasksIds = useAppSelector(state => selectSubTasksIdsByTaskId(state, taskId))

	const completed = useAppSelector(state => selectCompletedSubTasksByTaskId(state, taskId))

	return (
		subTasksIds && subTasksIds?.length > 0 ?
		
		<>
			<h3 className="text-lg">
				Subtasks ({completed} / {subTasksIds.length})
			</h3>

			<ul className="flex flex-col gap-2">
				{subTasksIds.map(id => <SubTaskCard key={id} subTaskId={id} parentTaskId={taskId}/>)}
			</ul>
		</>

		: null
	)
}

export default SubTasksList
