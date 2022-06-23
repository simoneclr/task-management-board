import { EntityId } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

import { selectBoardById } from "../../store/boards/boardsSlice"

interface NavbarProps {
	boardId: EntityId
}

// Displays the navigation bar at the top of the app
function Navbar({boardId}: NavbarProps) {

	const selectedBoard = useSelector((state: RootState) => selectBoardById(state, boardId))

	return (
		<nav className="flex items-center h-20 px-8 gap-8 bg-slate-400">
			<h1 className="text-3xl">
				{selectedBoard?.name}
			</h1>			
		</nav>
	)
}

export default Navbar
