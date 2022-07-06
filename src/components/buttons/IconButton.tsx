import React, { ReactNode, SyntheticEvent } from "react";

interface IconButtonProps {
	children: ReactNode;
	disabled?: boolean;
	onClick: (e?: SyntheticEvent) => void;
}

function IconButton({children, disabled, onClick}: IconButtonProps) {

	// Additional classes to be injected into children
	const injectedClassName = "fill-current " + 
		"group-disabled:fill-slate-500 group-hover:fill-blue-600 group-active:fill-blue-700 "

	return (
		<button type="button" onClick={onClick} disabled={disabled ? disabled : false}
			className="group cursor-pointer p-1 disabled:bg-transparent hover:bg-slate-200 focus:bg-slate-200
				disabled:cursor-not-allowed outline-none rounded-sm">
			{
				React.Children.map(children, child => {
					if (React.isValidElement(child)) {
						return React.cloneElement(child, {
							className: (child.props.className ? child.props.className : "") + " " + injectedClassName
						})
					} else {
						return child
					}
				})
			}
		</button>
	)
}

export default IconButton
