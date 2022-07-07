import { EntityId } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { SubTask } from "../../model/tasksTypes";

import { editTask as editTaskThunk, selectTaskById } from "../../store/tasks/tasksSlice";

import TaskForm from "./TaskForm"
import { selectSubTasksByTaskId } from "../../store/subTasks/subTasksSlice";

interface EditTaskFormProps {
	taskId: EntityId;
	closeModal: () => void;
}

// Wraps TaskForm, initializing it to create a new task
function EditTaskForm({taskId, closeModal}: EditTaskFormProps) {

	const dispatch = useAppDispatch()

	const task = useAppSelector(state => selectTaskById(state, taskId))

	const existingSubTasks = useAppSelector(state => selectSubTasksByTaskId(state, taskId))

	const editTask = (name: string, description: string, subTasks:SubTask[]) => {

		const removedSubTasks = existingSubTasks.filter(st => 
			!subTasks.map(subTask => subTask.id).includes(st.id)
		)

		dispatch(editTaskThunk(taskId, name, description, subTasks, removedSubTasks))

		closeModal()
	}

	return (

		task ?

		<>
			<h2 className="text-2xl">
				Add New Task
			</h2>

			<TaskForm saveTask={editTask} 
				taskName={task.name} taskDescription={task.description} existingSubTasks={existingSubTasks}
			/>
		</>

		:

		<>
			{/* Should not be reachable, but better be safe */}
			<span>Opps! Something went wrong</span>
		</>
	)
}

export default EditTaskForm
