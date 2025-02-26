import { ReactNode } from "react";

interface Props {
	handleSelection: () => void;
	buttonContent: ReactNode;
}

const ChoseButton: React.FunctionComponent<Props> = ({
	handleSelection,
	buttonContent,
}) => {
	return (
		<button
			onClick={handleSelection}
			className='cursor-pointer transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-150'
		>
			{buttonContent}
		</button>
	);
};

export default ChoseButton;
