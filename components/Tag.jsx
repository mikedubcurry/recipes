function Tag({ tag, selected, dispatch }) {

    const toggleSelect = () => {
        if(selected) {
            dispatch({type: 'remove_tag', payload: tag})
        } else {
            dispatch({type: 'add_tag', payload: tag})
        }
    }
	if (selected === undefined) {
		return <li className="transition max-w-fit bg-orange-400 px-4 py-2 rounded-xl">{tag.tag}</li>;
	} else {
		return <li onClick={toggleSelect} className={`transition max-w-fit ${selected ? 'bg-orange-500' : 'bg-orange-400 hover:bg-orange-300'} px-4 py-2 rounded-xl`}>{tag.tag}</li>;
	}
}

export default Tag;
