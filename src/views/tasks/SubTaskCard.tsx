import { SubTask } from "../../model/tasksTypes"

interface SubTaskCardProps {
	subTask: SubTask;
}

// Displays a card for a single subTask
function SubTaskCard({subTask}: SubTaskCardProps) {
	return (
		<li className={(subTask.isDone ? "line-through " : " ") + "p-2 bg-slate-200 rounded-sm"}>
			{subTask.name}
		</li>
	)
}

export default SubTaskCard
