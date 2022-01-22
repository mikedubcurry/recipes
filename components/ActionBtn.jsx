function ActionButton({ btnText, handleClick, type }) {
	return (
		<button
			aria-label={btnText}
			className={`px-4 py-2 ${
				type === 'warn' ? 'bg-red-300' : type === 'success' ? 'bg-green-300' : 'bg-yellow-100'
			} rounded-xl flex items-center`}
			onClick={handleClick}
		>
			<span>{btnText}</span>
		</button>
	);
}

export default ActionButton;
