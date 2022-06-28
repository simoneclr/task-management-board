import { EntityId } from "@reduxjs/toolkit"
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { selectTaskById } from "../../store/tasks/tasksSlice";

import Modal from "../../components/Modal";
import TaskModalDetails from "./TaskModalDetails";

interface TaskCardProps {
	taskId: EntityId;
}

// Displays a Card with a task information
function TaskCard({taskId}: TaskCardProps) {

	const task = useSelector((state: RootState) => selectTaskById(state, taskId))

	const [modalOpen, setModalOpen] = useState<boolean>(false)

	const closeModal = () => {
		setModalOpen(false)
	}

	return (
		task ?

		<li>
			<div onClick={e => setModalOpen(true)} 
				className="cursor-pointer bg-slate-50 p-4 rounded-sm shadow 
								hover:bg-slate-100 active:bg-slate-200 transition-colors duration-100">
				{task.name}
			</div>

			<Modal isOpen={modalOpen} close={closeModal}>
				<TaskModalDetails taskId={taskId}/>
			</Modal>			
		</li>		

		:
		
		null
	)
}

export default TaskCard
