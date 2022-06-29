import { EntityId } from "@reduxjs/toolkit"
import { useAppDispatch } from "../../store/hooks";

import { taskAdded } from "../../store/tasks/tasksSlice";

import { SubTask } from "../../model/tasksTypes";

import TaskForm from "./TaskForm"

interface AddTaskFormProps {
	parentBoardId: EntityId;
	closeModal: () => void;
}

// Wraps TaskForm, initializing it to create a new task
function AddTaskForm({parentBoardId, closeModal}: AddTaskFormProps) {

	const dispatch = useAppDispatch()

	const addTask = (name: string, description: string, subTasks:SubTask[]) => {
		dispatch(taskAdded(parentBoardId, name, description))

		closeModal()
	}

	return (
		<>
			<h2 className="text-2xl">
				Add New Task
			</h2>

			<TaskForm saveTask={addTask}/>
		</>
	)
}

export default AddTaskForm
