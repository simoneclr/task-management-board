import { useEffect, useRef, useState } from "react";

import { SubTask } from "../../model/tasksTypes";

interface EditableSubTaskCardProps {
	subTask: SubTask;
	updateSubTask: (name: string) => void;
	deleteSubTask: () => void;
}

// Displays a card for a subtask, and allows to edit it
function EditableSubTaskCard({subTask, updateSubTask, deleteSubTask}: EditableSubTaskCardProps) {

	// If the draft subTask's name is empty (i.e. it's a newly created one), open in editable mode
	const [editable, setEditable] = useState<boolean>(subTask.name === "")

	// Controls the name input
	const [subTaskName, setSubTaskName] = useState<string>(subTask.name)

	// Ref for the subTask name edit input
	const nameInput = useRef<HTMLInputElement>(null)

	// Whenever editable is set to true, focus the input field
	useEffect(() => {
		if (editable && nameInput && nameInput.current) {
			nameInput.current.focus()
		}
	}, [editable])

	// TODO: There might be a better/safer way to go about this
	// If at any point the subtask's name is empty, and it's not in edit mode, delete the subtask
	useEffect(() => {
		if (subTask.name === "" && !editable) {
			deleteSubTask()
		}
	}, [editable, subTask])

	const handleSaveButtonClick = () => {
		updateSubTask(subTaskName)

		setEditable(false)
	}

	const handleCancelButtonClick = () => {
		setEditable(false)

		// Reset state value to the original subTask's name
		setSubTaskName(subTask.name)
	}

	return (
		<li className="relative flex justify-between">
			{ editable ?
			
				<input type="text" ref={nameInput} value={subTaskName} 
							onChange={e => setSubTaskName(e.target.value)}
							className="input-outline grow p-2 rounded-sm"/>
				
				:

				<span className="grow block p-2 bg-slate-200 rounded-sm">
					{subTask.name}
				</span>
			}

			<div className="absolute right-2 bottom-2 flex gap-2 justify-end items-center">
				{ editable ?
					<>
						<button type="button" onClick={handleCancelButtonClick}>
							Cancel
						</button>

						<button type="button" onClick={handleSaveButtonClick} disabled={subTaskName === ""}>
							Save
						</button>
					</>

					:
					
					<>
						<button type="button" onClick={() => setEditable(true)}>
							Edit
						</button>

						<button type="button" onClick={() => deleteSubTask()}>
							Delete
						</button>
					</>
				}
			</div>
		</li>
	)
}

export default EditableSubTaskCard
