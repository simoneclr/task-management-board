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
import Modal from "../../components/Modal";
import { useState } from "react";
import AddTaskForm from "../tasks/AddTaskForm";

interface TaskBoardProps {
	boardId: EntityId;
}

// Displays a board with all its relative tasks
function TaskBoard({boardId}: TaskBoardProps) {

	const plannedTasksIds = useSelector((state: RootState) => selectPlannedTasksIdsByBoardIds(state, boardId))
	const doingTasksIds = useSelector((state: RootState) => selectDoingTasksIdsByBoardIds(state, boardId))
	const doneTasksIds = useSelector((state: RootState) => selectDoneTasksIdsByBoardIds(state, boardId))

	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const openModal = () => {
		setModalOpen(true)
	}

	const closeModal = () => {
		setModalOpen(false)
	}

	return (
		<div className="relative grid grid-cols-3 gap-8 p-8">
			{/* Planned column */}
			<TasksColumn name={TaskStatus.PLANNED} tasksIds={plannedTasksIds}/>
			
			{/* Doing column */}
			<TasksColumn name={TaskStatus.DOING} tasksIds={doingTasksIds}/>

			{/* Done column */}
			<TasksColumn name={TaskStatus.DONE} tasksIds={doneTasksIds}/>

			<AddTaskButton clickHandler={openModal}/>

			<Modal isOpen={modalOpen} close={closeModal}>
				<AddTaskForm parentBoardId={boardId} closeModal={closeModal}/>
			</Modal>
		</div>
	)
}

export default TaskBoard
