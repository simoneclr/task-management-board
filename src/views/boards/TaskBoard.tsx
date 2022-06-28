import { EntityId } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { TaskStatus } from "../../model/tasksTypes";

import { 
	selectDoingTasksIdsByBoardIds, 
	selectDoneTasksIdsByBoardIds, 
	selectPlannedTasksIdsByBoardIds 
} from "../../store/tasks/tasksSlice";

import TasksColumn from "../tasks/TasksColumn";
import AddTaskButton from "../tasks/AddTaskButton";

interface TaskBoardProps {
	boardId: EntityId;
}

// Displays a board with all its relative tasks
function TaskBoard({boardId}: TaskBoardProps) {

	const plannedTasksIds = useSelector((state: RootState) => selectPlannedTasksIdsByBoardIds(state, boardId))
	const doingTasksIds = useSelector((state: RootState) => selectDoingTasksIdsByBoardIds(state, boardId))
	const doneTasksIds = useSelector((state: RootState) => selectDoneTasksIdsByBoardIds(state, boardId))

	return (
		<div className="relative grid grid-cols-3 gap-8 p-8">
			{/* Planned column */}
			<TasksColumn name={TaskStatus.PLANNED} tasksIds={plannedTasksIds}/>
			
			{/* Doing column */}
			<TasksColumn name={TaskStatus.DOING} tasksIds={doingTasksIds}/>

			{/* Done column */}
			<TasksColumn name={TaskStatus.DONE} tasksIds={doneTasksIds}/>

			<AddTaskButton clickHandler={(e) => {}}/>
		</div>
	)
}

export default TaskBoard
