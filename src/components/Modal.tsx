import { ReactNode, SyntheticEvent } from "react";

interface ModalProps {
	isOpen: boolean;
	close: (e?: SyntheticEvent) => void;
	children: ReactNode;
}

function Modal({isOpen, close, children}: ModalProps) {

	const handleModalClick = (e: SyntheticEvent) => {
		if (e.target === e.currentTarget) {
			close(e)
		}
	}

	return (
		isOpen ?

		<div onClick={handleModalClick}
			className="fixed inset-0 flex items-center justify-center bg-black/75">
			<div className="flex flex-col gap-4 w-1/3 p-8 bg-slate-50 rounded">
				{children}
			</div>			
		</div>

		:

		null
	)
}

export default Modal
