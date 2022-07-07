import { EntityId } from "@reduxjs/toolkit"
import { SyntheticEvent } from "react";
import PrimaryButtonSmall from "../../components/buttons/PrimaryButtonSmall";
import { TaskStatus } from "../../model/tasksTypes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { selectCanCompleteTaskId } from "../../store/subTasks/subTasksSlice";
import { selectTaskById, taskCompleted, taskStarted } from "../../store/tasks/tasksSlice";

interface TaskActionsProps {
	taskId: EntityId;
	handleEditClick: (e?: SyntheticEvent) => void;
}

// Displays available actions for the specified task
function TaskActions({taskId, handleEditClick}: TaskActionsProps) {

	const dispatch = useAppDispatch()

	const task = useAppSelector(state => selectTaskById(state, taskId))

	const canComplete = useAppSelector(state => selectCanCompleteTaskId(state, taskId))
	
	const startTask = () => {
		dispatch(taskStarted(taskId))
	}

	const completeTask = () => {
		dispatch(taskCompleted(taskId))
	}

	return (
		task ?

		<div className="relative flex gap-4">
			{ task.status === TaskStatus.PLANNED &&
				// Allow editing only on planned tasks
				<>
					<PrimaryButtonSmall clickHandler={startTask}>
						Start Doing
					</PrimaryButtonSmall>
					
					<button onClick={handleEditClick}>
						Edit
					</button>
				</>
			}

			{ (task.status === TaskStatus.DOING) &&
				// Allow to mark as complete only if all subtasks have been completed
				<PrimaryButtonSmall clickHandler={completeTask} disabled={!canComplete}
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
