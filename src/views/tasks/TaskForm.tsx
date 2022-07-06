import { SyntheticEvent, useState } from "react";

import { SubTask } from "../../model/tasksTypes";

import SubTasksFormWidget from "../subTasks/SubTasksFormWidget";

interface TaskFormProps {
	taskName?: string;
	taskDescription?: string;
	existingSubTasks?: SubTask[];
	saveTask: (
		name: string,
		description: string,
		subTasks: SubTask[]
	) => void;
}

// Displays a form to create/edit a task
function TaskForm({taskName, taskDescription, existingSubTasks, saveTask}: TaskFormProps) {

	const [name, setName] = useState<string>(taskName ? taskName : "")

	const [description, setDescription] = useState<string>(taskDescription ? taskDescription : "")

	const [subTasks, setSubTasks] = useState<SubTask[]>(existingSubTasks ? existingSubTasks.slice() : [])

	// Adds a new subtask to the list, with empty name and temporary, made-up values in the other fields
	const addNewSubTask = () => {
		setSubTasks(prevState => [...prevState, {
			id: "-1",
			parentTaskId: "-1",
			isDone: false,
			name: ""
		}])
	}

	// Given an index, returns a function that updates the subtask at that index (if present) in the local state
	const updateSubTaskAtIndex = (index: number) => (name: string) => {
		setSubTasks(prevState => {
			let updated = prevState.slice()

			updated[index].name = name

			return updated
		})
	}

	// Given an index, returns a function that deletes the subtask at that index in the local state
	const deleteSubTaskAtIndex = (index: number) => () => {
		setSubTasks(prevState => {
			const updated = prevState.slice()

			updated.splice(index, 1)

			return updated
		})
	}

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		
		saveTask(name, description, subTasks)
	}

	return (
		<form onSubmit={onSubmit}
					className="flex flex-col gap-4">			
			<label className="flex flex-col items-stretch gap-2">
				<span>Name:</span>

				<input type="text" name="name" value={name} onChange={e => setName(e.target.value)} 
							className="input-outline p-2 rounded-sm"/>
			</label>
			
			<label className="flex flex-col items-stretch gap-2">
				<span>Description:</span>

				<textarea name="description" value={description} onChange={e => setDescription(e.target.value)}
									rows={5} className="resize-none input-outline p-2 rounded-sm">
				</textarea>
			</label>

			<SubTasksFormWidget subTasks={subTasks} 
				addSubTask={addNewSubTask} 
				updateSubTaskAtIndex={updateSubTaskAtIndex}
				deleteSubTaskAtIndex={deleteSubTaskAtIndex}
			/>

			<button type="submit" disabled={name === "" || description === ""}
							className="btn-primary rounded-full p-2">
				{/* If an existing name was provided, it means this is editing an existing task */}
				{/* If no name was provided, it means this is creating a new task */}
				{taskName ? "Save Changes" : "Create Task"}
			</button>
		</form>
	)
}

export default TaskForm
