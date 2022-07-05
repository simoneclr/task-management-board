import { useState } from "react";

import { SubTask } from "../../model/tasksTypes";

interface EditableSubTaskCardProps {
	subTask: SubTask;
	updateSubTask: (name: string) => void;
}

// Displays a card for a subtask, and allows to edit it
function EditableSubTaskCard({subTask, updateSubTask}: EditableSubTaskCardProps) {

	// If the draft subTask's name is empty (i.e. it's a newly created one), open in editable mode
	const [editable, setEditable] = useState<boolean>(subTask.name === "")

	// Controls the name input
	const [subTaskName, setSubTaskName] = useState<string>(subTask.name)

	const handleSaveButtonClick = () => {
		updateSubTask(subTaskName)

		setEditable(false)
	}

	return (
		<li className="relative flex justify-between">
			{ editable ?
			
				<input type="text" value={subTaskName} onChange={e => setSubTaskName(e.target.value)}
							className="input-outline grow p-2 rounded-sm"/>
				
				:

				<span className="grow block p-2 bg-slate-200 rounded-sm">
					{subTask.name}
				</span>
			}

			<div className="absolute right-2 bottom-2 flex gap-2 justify-end items-center">
				{ editable ?
					<>
						<button type="button">
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

						<button type="button">
							Delete
						</button>
					</>
				}
			</div>
		</li>
	)
}

export default EditableSubTaskCard
