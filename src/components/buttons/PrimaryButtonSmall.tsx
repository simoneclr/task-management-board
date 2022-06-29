import { ReactNode, SyntheticEvent } from "react";

interface PrimaryButtonSmallProps {
	disabled?: boolean;
	tooltipContent?: string;
	children: ReactNode;
	clickHandler: (e?: SyntheticEvent) => void
}

function PrimaryButtonSmall({disabled, tooltipContent, children, clickHandler}: PrimaryButtonSmallProps) {
	
	return (
		<>
		<button onClick={e => clickHandler(e)} disabled={disabled ? disabled : false}
			className="peer btn-primary px-6 py-2 rounded-full">
			{children}
		</button>

		{	tooltipContent &&
			<div className="absolute bottom-12 hidden peer-hover:block p-2 w-full rounded
				bg-black text-white text-sm">
				{tooltipContent}
			</div>
		}
		</>
	)
}

export default PrimaryButtonSmall
