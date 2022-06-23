import { EntityId } from "@reduxjs/toolkit"
import { useAppSelector } from "../../store/hooks"

import { selectSubTasksByTaskId } from "../../store/tasks/tasksSlice"

import SubTaskCard from "./SubTaskCard"

interface SubTasksListProps {
	taskId: EntityId
}

// Displays a list ob subtasks for a given task
function SubTasksList({taskId}: SubTasksListProps) {

	const subTasks = useAppSelector(state => selectSubTasksByTaskId(state, taskId))

	const completed = subTasks?.reduce((sum, subTask) => sum += subTask.isDone ? 1 : 0, 0)

	return (
		subTasks && subTasks?.length > 0 ?
		
		<>
			<h3 className="text-lg">
				Subtasks ({completed} / {subTasks.length})
			</h3>

			<ul className="flex flex-col gap-2">
				{subTasks.map(subTask => <SubTaskCard key={subTask.id} subTask={subTask}/>)}
			</ul>
		</>

		: null
	)
}

export default SubTasksList
