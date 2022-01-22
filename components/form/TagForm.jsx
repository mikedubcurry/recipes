import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import TagList from '../TagList';

// should take list of existing tags or create a new one

function TagForm({ dispatch, tags }) {
	const [tag, setTag] = useState(undefined);
	
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
				<TagList editing={''} tags={tags} selectedTags={tags} dispatch={dispatch} />
			</label>
		</>
	);
}

export default TagForm;
