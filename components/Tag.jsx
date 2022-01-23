function Tag({ tag, selected, dispatch, editing }) {
	const toggleSelect = () => {
		if (editing !== false) {
			if (selected) {
				console.log('remove');
				dispatch({ type: 'remove_tag', payload: tag });
			} else {
                console.log('add');
				dispatch({ type: 'add_tag', payload: tag });
			}
		}
	};
	if (selected === undefined) {
		return <li className="transition max-w-fit bg-orange-400 px-4 py-2 rounded-xl">{tag.tag}</li>;
	} else {
		return (
			<li
				className={`transition max-w-fit ${
					selected && !editing ? 'bg-orange-500' : 'bg-orange-400 hover:bg-orange-300'
				} ${editing ? 'animate-wiggle' : ''} ${editing ? 'hover:line-through' : ''} px-4 py-2 rounded-xl`}
			>
				<button 				aria-label={'filter recipes by ' + tag.tag}
 onClick={toggleSelect}>{tag.tag}</button>
			</li>
		);
	}
}

export default Tag;
