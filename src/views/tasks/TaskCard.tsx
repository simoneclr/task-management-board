import { EntityId } from "@reduxjs/toolkit"
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { TaskStatus } from "../../model/tasksTypes";

import { selectTaskById } from "../../store/tasks/tasksSlice";

import Modal from "../../components/Modal";
import TaskModalDetails from "./TaskModalDetails";
import EditTaskForm from "./EditTaskForm";

interface TaskCardProps {
	taskId: EntityId;
}

// Displays a Card with a task information
function TaskCard({taskId}: TaskCardProps) {

	const task = useSelector((state: RootState) => selectTaskById(state, taskId))

	const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false)

	const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

	const closeDetailsModal = () => {
		setDetailsModalOpen(false)
	}

	const openEditModal = () => {
		// Only allow to open edit modal if the task is in PLANNED status
		if (task && task.status === TaskStatus.PLANNED) {
			setDetailsModalOpen(false)

			setEditModalOpen(true)
		}
	}

	const closeEditModal = () => {
		setEditModalOpen(false)

		setDetailsModalOpen(true)
	}

	return (
		task ?

		<li>
			<div onClick={e => setDetailsModalOpen(true)} 
				className="cursor-pointer bg-slate-50 p-4 rounded-sm shadow 
								hover:bg-slate-100 active:bg-slate-200 transition-colors duration-100">
				{task.name}
			</div>

			<Modal isOpen={detailsModalOpen} close={closeDetailsModal}>
				<TaskModalDetails taskId={taskId} handleEditClick={openEditModal}/>
			</Modal>

			<Modal isOpen={editModalOpen} close={closeEditModal}>
				<EditTaskForm taskId={taskId} closeModal={closeEditModal}/>
			</Modal>			
		</li>		

		:
		
		null
	)
}

export default TaskCard
