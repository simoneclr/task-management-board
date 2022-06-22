import { EntityId } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { selectTaskById } from "../../store/tasks/tasksSlice";

interface TaskDetailsModalProps {
	taskId: EntityId;
	isOpen: boolean;
	closeModal: () => void;
}

// Displays a modal containing all the details of a specified task
function TaskDetailsModal({taskId, isOpen, closeModal}: TaskDetailsModalProps) {

	const task = useSelector((state: RootState) => selectTaskById(state, taskId))

	return (
		(isOpen && task) ?

		<div onClick={e => closeModal()}
			className="fixed inset-0 flex items-center justify-center bg-black/75">
			<div className="flex flex-col gap-4 w-1/3 p-8 bg-slate-50 rounded">
				<h2 className="text-2xl">
					{task.name}
				</h2>

				<p>
					{/* {task.description} */}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis doloribus illo totam pariatur, reprehenderit aliquam eius ipsam voluptatem inventore, dolores voluptate incidunt error sint! Esse impedit incidunt officiis perferendis iure.
				</p>

				{/* Subtasks */}

				{/* Actions */}
			</div>			
		</div>

		:

		null
	)
}

export default TaskDetailsModal
