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
		<li className="flex justify-between p-2 bg-slate-200">
			{ editable ?

				<>
					<input type="text" value={subTaskName} onChange={e => setSubTaskName(e.target.value)}
						className="grow"/>

					<button type="button" onClick={handleSaveButtonClick} disabled={subTaskName === ""}>
						Save
					</button>
				</>

				:

				<>
					<span>{subTask.name}</span>

					<button type="button" onClick={() => setEditable(true)}>
						Edit
					</button>
				</>
			}
		</li>
	)
}

export default EditableSubTaskCard
