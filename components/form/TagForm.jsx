import { useState } from 'react';
import {v4 as uuid} from 'uuid'

// should take list of existing tags or create a new one

function TagForm({ dispatch, tags }) {
	const [tag, setTag] = useState('');

	return (
		<>
			<label className="flex flex-col w-full" htmlFor="tag">
				Add a Tag
				<input
					type="text"
					id="tag"
					value={tag}
					onChange={(e) => {
						setTag(e.target.value);
					}}
				/>
			</label>
			<button
				type='button'
				onClick={() => {
					dispatch({
						type: 'add_tag',
						payload: {
							id: uuid(),
							tag,
						},
					});
          setTag('')
				}}
			>
				Add Tag
			</button>
		</>
	);
}

export default TagForm;
