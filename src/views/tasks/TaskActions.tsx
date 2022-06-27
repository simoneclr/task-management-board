import { EntityId } from "@reduxjs/toolkit"
import PrimaryButtonSmall from "../../components/buttons/PrimaryButtonSmall";
import { TaskStatus } from "../../model/tasksTypes";
import { useAppSelector } from "../../store/hooks";

import { selectCanCompleteTaskId } from "../../store/subTasks/subTasksSlice";
import { selectTaskById } from "../../store/tasks/tasksSlice";

interface TaskActionsProps {
	taskId: EntityId;
}

// Displays available actions for the specified task
function TaskActions({taskId}: TaskActionsProps) {

	const task = useAppSelector(state => selectTaskById(state, taskId))

	const canComplete = useAppSelector(state => selectCanCompleteTaskId(state, taskId))

	return (
		task ?

		<div className="relative flex gap-4">
			{ task.status === TaskStatus.PLANNED &&
				// Allow editing only on planned tasks
				<>
					<PrimaryButtonSmall clickHandler={e => {}}>
						Start Doing
					</PrimaryButtonSmall>
					
					<button>
						Edit
					</button>
				</>
			}

			{ (task.status === TaskStatus.DOING) &&
				// Allow to mark as complete only if all subtasks have been completed
				<PrimaryButtonSmall clickHandler={e => {}} disabled={!canComplete}
					tooltipContent={
						!canComplete ? 
						"You must finish all sub-tasks before marking this as complete" 
						: undefined
					}
				>
					Mark As Complete
				</PrimaryButtonSmall>
			}
		</div>

		: null
	)
}

export default TaskActions
