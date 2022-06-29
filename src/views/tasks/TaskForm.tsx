import { SyntheticEvent, useState } from "react";

import { SubTask } from "../../model/tasksTypes"

interface TaskFormProps {
	taskName?: string;
	taskDescription?: string;
	subTasksList?: SubTask[];
	saveTask: (
		name: string,
		description: string,
		subTasks: SubTask[]
	) => void;
}

// Displays a form to create/edit a task
function TaskForm({taskName, taskDescription, subTasksList, saveTask: submitHandler}: TaskFormProps) {

	const [name, setName] = useState<string>(taskName ? taskName : "")
	const [description, setDescription] = useState<string>(taskDescription ? taskDescription : "")
	const [subTasks, setSubTasks] = useState<SubTask[]>(subTasksList ? subTasksList : [])

	const onSubmit = (e: SyntheticEvent) => {
		e.preventDefault()

		submitHandler(name, description, subTasks)
	}

	return (
		<form onSubmit={onSubmit}
					className="flex flex-col gap-4">			
			<label className="flex flex-col items-stretch gap-2">
				<span>Name:</span>

				<input type="text" name="name" value={name} onChange={e => setName(e.target.value)} 
							className="outline outline-2 outline-neutral-600 focus:outline-blue-600
							p-2 rounded-sm"/>
			</label>
			
			<label className="flex flex-col items-stretch gap-2">
				<span>Description:</span>

				<textarea name="description" value={description} onChange={e => setDescription(e.target.value)}
									rows={5} className="resize-none outline outline-2 outline-neutral-600 focus:outline-blue-600
									p-2 rounded-sm">
				</textarea>
			</label>

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
