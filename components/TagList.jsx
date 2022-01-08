import Tag from './Tag';

function TagList({ tags, selectedTags, dispatch }) {
	return (
		<ul className="flex items-center">
			{tags.map(({ tag, id }, i) => (
				<Tag selected={selectedTags.includes(id)} dispatch={dispatch} tag={{tag, id}} key={id} />
			))}
		</ul>
	);
}

export default TagList;