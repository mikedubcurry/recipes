import Tag from "./Tag";

function TagList({ tags, selectedState }) {
	const [selectedTags, setSelectedTags] = selectedState
    return (
        <ul className="flex items-center">
            {tags.map(({tag, id}, i) => (
				<Tag tag={tag} key={id} selected={selectedTags.includes(i)} />
            ))}
        </ul>
    );
}

export default TagList;
