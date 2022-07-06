import { SubTask } from "../../model/tasksTypes";

import EditableSubTaskCard from "./EditableSubTaskCard";

interface SubTasksFormWidgetProps {
	subTasks: SubTask[];
	addSubTask: () => void;
	updateSubTaskAtIndex: (index: number) => (name: string) => void;
	deleteSubTaskAtIndex: (index: number) => () => void;
}

// Displays a list of existing sub tasks, allows to edit them and to add new ones
function SubTasksFormWidget({
	subTasks,
	addSubTask,
	updateSubTaskAtIndex,
	deleteSubTaskAtIndex
}: SubTasksFormWidgetProps) {
	return (
		<div className="flex flex-col gap-4 items-stretch">
			
			<span>Subtasks:</span>

			{ subTasks.length > 0 &&
			
				<ul className="flex flex-col gap-3">
					{subTasks.map((subTask, i) => 
						<EditableSubTaskCard key={i} subTask={subTask}
							updateSubTask={updateSubTaskAtIndex(i)}
							deleteSubTask={deleteSubTaskAtIndex(i)}
						/>
					)}
				</ul>
			}

			<button type="button" onClick={addSubTask}
					className="p-2 rounded-full text-white font-bold
						bg-slate-400 hover:bg-slate-500 active:bg-slate-600">
				Add Subtask
			</button>
		</div>
	)
}

export default SubTasksFormWidget
