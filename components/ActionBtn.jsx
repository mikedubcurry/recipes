function ActionButton({ btnText, handleClick, type }) {
	return (
		<button
			type="button"
			aria-label={btnText}
			className={`dark:bg-blue-900 px-2 py-1 ${
				type === 'warn' ? 'bg-red-300' : type === 'success' ? 'bg-green-300' : 'bg-yellow-100'
			} rounded-xl flex items-center`}
			onClick={handleClick}
		>
			<span>{btnText}</span>
		</button>
	);
}

export default ActionButton;
