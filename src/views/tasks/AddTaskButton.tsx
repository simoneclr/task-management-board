import { SyntheticEvent } from "react"

import {ReactComponent as IconPlus} from "../../assets/svgs/plus-solid.svg"

interface AddTaskButtonProps {
	clickHandler: (e?: SyntheticEvent) => void
}

function AddTaskButton({clickHandler}: AddTaskButtonProps) {
	return (
		<button onClick={clickHandler}
			className="group fixed bottom-8 right-8 flex items-center justify-center h-12 overflow-hidden
				bg-blue-600 active:bg-blue-700 text-white font-bold rounded-full">
			<span className="block w-12">
				<IconPlus className="fill-current h-7 mx-auto"/>
			</span>

			<span className="text-left w-0 whitespace-nowrap group-hover:w-32	transition-all duration-300">
				Add New Task
			</span>
		</button>
	)
}

export default AddTaskButton
