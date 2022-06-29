import { EntityId } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { selectTaskById } from "../../store/tasks/tasksSlice";
import SubTasksList from "../subTasks/SubTasksList";
import TaskActions from "./TaskActions";

interface TaskDetailsModalProps {
	taskId: EntityId;
}

// Displays a modal containing all the details of a specified task
function TaskModalDetails({taskId}: TaskDetailsModalProps) {

	const task = useSelector((state: RootState) => selectTaskById(state, taskId))

	return (
		task ?

		<>
			<h2 className="text-2xl">
				{task.name}
			</h2>

			<p>
				{/* {task.description} */}
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis doloribus illo totam pariatur, reprehenderit aliquam eius ipsam voluptatem inventore, dolores voluptate incidunt error sint! Esse impedit incidunt officiis perferendis iure.
			</p>

			<SubTasksList taskId={taskId}/>

			<TaskActions taskId={taskId}/>
		</>

		:

		null
	)
}

export default TaskModalDetails
