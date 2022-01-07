function Tag({ tag, selected }) {
    return (
        <li className="transition max-w-fit bg-orange-400 hover:bg-orange-300 px-4 py-2 rounded-xl">
            {tag}
        </li>
    );
}

export default Tag;
