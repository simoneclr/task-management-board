import { EntityId } from "@reduxjs/toolkit"
import { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { selectTaskById } from "../../store/tasks/tasksSlice";
import SubTasksList from "./SubTasksList";
import TaskActions from "./TaskActions";

interface TaskDetailsModalProps {
	taskId: EntityId;
	isOpen: boolean;
	closeModal: () => void;
}

// Displays a modal containing all the details of a specified task
function TaskDetailsModal({taskId, isOpen, closeModal}: TaskDetailsModalProps) {

	const task = useSelector((state: RootState) => selectTaskById(state, taskId))

	const onModalClick = (e: SyntheticEvent) => {
		if (e.target === e.currentTarget) {
			closeModal()
		}
	}

	return (
		(isOpen && task) ?

		<div onClick={e => onModalClick(e)}
			className="fixed inset-0 flex items-center justify-center bg-black/75">
			<div className="flex flex-col gap-4 w-1/3 p-8 bg-slate-50 rounded">
				<h2 className="text-2xl">
					{task.name}
				</h2>

				<p>
					{/* {task.description} */}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis doloribus illo totam pariatur, reprehenderit aliquam eius ipsam voluptatem inventore, dolores voluptate incidunt error sint! Esse impedit incidunt officiis perferendis iure.
				</p>

				<SubTasksList taskId={taskId}/>

				<TaskActions taskId={taskId}/>
			</div>			
		</div>

		:

		null
	)
}

export default TaskDetailsModal
