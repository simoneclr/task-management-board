import { ReactNode, SyntheticEvent } from "react";

interface ModalProps {
	isOpen: boolean;
	close: (e?: SyntheticEvent) => void;
	children: ReactNode;
}

function Modal({isOpen, close, children}: ModalProps) {
	return (
		isOpen ?

		<div onClick={e => close(e)}
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
