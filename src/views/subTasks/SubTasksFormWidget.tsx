import { SubTask } from "../../model/tasksTypes";
import EditableSubTaskCard from "./EditableSubTaskCard";

interface SubTasksFormWidgetProps {
	subTasks: SubTask[];
	addSubTask: () => void;
	updateSubTaskAtIndex: (index: number) => (name: string) => void;
}

// Displays a list of existing sub tasks, allows to edit them and to add new ones
function SubTasksFormWidget({subTasks, addSubTask, updateSubTaskAtIndex}: SubTasksFormWidgetProps) {
	return (
		<div className="flex flex-col gap-3 items-stretch">
			<span>Subtasks:</span>

			<ul className="flex flex-col gap-2">
				{subTasks.map((subTask, i) => 
					<EditableSubTaskCard key={i} subTask={subTask} updateSubTask={updateSubTaskAtIndex(i)}/>
				)}
			</ul>

			<button type="button" onClick={addSubTask}>
				Add Subtask
			</button>
		</div>
	)
}

export default SubTasksFormWidget
