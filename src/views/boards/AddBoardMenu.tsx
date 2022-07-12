import { SyntheticEvent, useState } from "react"

import SecondaryButton from "../../components/buttons/SecondaryButton"
import Modal from "../../components/Modal"
import { boardAdded } from "../../store/boards/boardsSlice"
import { useAppDispatch } from "../../store/hooks"

// Allows to create a new board. Displays a button that opens a modal with the form
function AddBoardMenu() {

	const dispatch = useAppDispatch()

	// Controls the modal
	const [formModalOpen, setFormModalOpen] = useState<boolean>(false)

	// Controls the input field holding the new Board's name
	const [boardName, setBoardName] = useState<string>("")

	const handleFormSubmit = (e: SyntheticEvent) => {
		e.preventDefault()

		dispatch(boardAdded(boardName))

		setBoardName("")
		setFormModalOpen(false)
	}

	return (
		<>
			<SecondaryButton onClick={() => setFormModalOpen(true)}>
				Add New Board
			</SecondaryButton>

			<Modal isOpen={formModalOpen} close={() => setFormModalOpen(false)}>
				<>
					<h2 className="text-2xl">
						Create New Board
					</h2>

					<form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
						<label className="flex flex-col items-stretch gap-2">
							<span>Board Name:</span>

							<input type="text" value={boardName} onChange={e => setBoardName(e.target.value)}
								className="input-outline p-2 rounded-sm"/>
						</label>

						<button type="submit" disabled={boardName === ""}
							className="btn-primary p-2 rounded-full">
							Confirm
						</button>
					</form>
				</>
			</Modal>
		</>
	)
}

export default AddBoardMenu
