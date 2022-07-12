import { ReactNode, SyntheticEvent } from "react"

interface SecondaryButtonProps {
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	onClick: (e?: SyntheticEvent) => void;
}

function SecondaryButton({children, className, disabled, onClick}: SecondaryButtonProps) {
	return (
		<>
			<button type="button" onClick={onClick} disabled={disabled ? disabled : false}
				className={`${className ? className : ""} px-6 py-2 rounded-full hover:text-blue-600 font-bold
				bg-slate-200 hover:bg-slate-300 active:bg-slate-400`}>
				
				{children}
			</button>
		</>
	)
}

export default SecondaryButton
