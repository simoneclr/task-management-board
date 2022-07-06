import { useEffect, useRef, useState } from "react";

import { SubTask } from "../../model/tasksTypes";

import {ReactComponent as IconEdit} from "../../assets/svgs/pen-to-square-regular.svg";
import {ReactComponent as IconSave} from "../../assets/svgs/check-solid.svg";
import {ReactComponent as IconCancel} from "../../assets/svgs/x-solid.svg";
import {ReactComponent as IconDelete} from "../../assets/svgs/trash-can-regular.svg";

import IconButton from "../../components/buttons/IconButton";

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
	}, [editable, subTask, deleteSubTask])

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

			<div className="absolute right-2 inset-y-0 flex gap-2 justify-end items-center">
				{ editable ?
					<>
						<IconButton onClick={handleCancelButtonClick}>
							<span className="sr-only">Cancel edit</span>
							<IconCancel className="h-5 w-5"/>
						</IconButton>

						<IconButton onClick={handleSaveButtonClick} disabled={subTaskName === ""}>
							<span className="sr-only">Save Changes</span>
							<IconSave className="h-5 w-5"/>
						</IconButton>
					</>

					:
					
					<>
						<IconButton onClick={() => setEditable(true)}>
							<span className="sr-only">Edit Sub-task</span>
							<IconEdit className="h-5 w-5"/>
						</IconButton>

						<IconButton onClick={() => deleteSubTask()}>
							<span className="sr-only">Delete Sub-task</span>
							<IconDelete className="h-5 w-5"/>
						</IconButton>
					</>
				}
			</div>
		</li>
	)
}

export default EditableSubTaskCard
