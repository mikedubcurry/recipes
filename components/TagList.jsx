import ActionButton from './ActionBtn';
import Tag from './Tag';

function TagList({ tags, selectedTags, editing, dispatch }) {
	return (
		<ul className="flex justify-between flex-wrap gap-4 items-center w-full">
			{tags.map(({ tag, id }) => (
				<Tag
					editing={editing}
					selected={selectedTags.includes(id) || editing}
					dispatch={dispatch}
					tag={{ tag, id }}
					key={id}
				/>
			))}
			{editing ? (
				<li>
					<ActionButton btnText="Add Tag" />
				</li>
			) : null}
		</ul>
	);
}

export default TagList;
