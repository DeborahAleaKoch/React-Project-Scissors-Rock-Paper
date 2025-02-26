interface Props {
	resetGame: () => void;
}

const RestartButton: React.FunctionComponent<Props> = ({ resetGame }) => {
	return (
		<button
			className='border-1 border-slate-800 bg-slate-700 rounded-xl px-5 py-2 text-slate-300 m-5 cursor-pointer hover:bg-slate-300 hover:text-slate-700'
			onClick={resetGame}
		>
			Restart game
		</button>
	);
};

export default RestartButton;
