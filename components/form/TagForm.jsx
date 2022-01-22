import { useState } from 'react';
import { v4 as uuid } from 'uuid';

// should take list of existing tags or create a new one

function TagForm({ dispatch, tags }) {
	const [tag, setTag] = useState('');
	console.log(tags);
	const pickTag = () => {
		
	};

	// return a text input, on focus, display scrollable list of tags, filter onChange
	// selecting a tag dispatches state
	return (
		<>
			<label className="flex flex-col w-full" htmlFor="tag">
				Add a Tag
				<input
					type="text"
					id="tag"
					value={tag}
					onChange={(e) => {
						// console.log(tags.filter(t => t.split(' ').join('').toLowerCase().includes(e.target.value.toLowerCase())));
						setTag(e.target.value);
					}}
				/>
			</label>
			<button
				type="button"
				onClick={() => {
					dispatch({
						type: 'add_tag',
						payload: {
							id: uuid(),
							tag,
						},
					});
					setTag('');
				}}
			>
				Add Tag
			</button>
		</>
	);
}

export default TagForm;
