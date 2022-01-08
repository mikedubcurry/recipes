import TagList from "./TagList";

function RecipeFilter({ inputState, dispatch, tags }) {
	const [filterInput, setFilterInput] = inputState;

	return (
		<div className="container w-full flex-col sm:flex-row sm:w-1/2 items-center mb-4 flex justify-center gap-2 md:gap-4">
			<label className="self-start sm:self-center" htmlFor="filterRecipes">
				Filter:
			</label>
			<input
				className="bg-slate-400 w-full px-8 py-2 text-black placeholder:text-gray-200"
				autoComplete="off"
				placeholder="Filter recipes..."
				id="filterRecipes"
				name="filterRecipe"
				type="text"
				value={filterInput}
				onChange={(e) => setFilterInput(e.target.value)}
			/>
			<button
				className="px-4 py-2 self-end md:w-full md:self-center rounded-lg bg-blue-300 disabled:bg-gray-400 disabled:text-gray-200"
				disabled={filterInput.length === 0 && tags.length === 0}
				onClick={() => {
					setFilterInput('');
                    dispatch({type: 'reset'})
				}}
			>
				Clear Filter
			</button>
		</div>
	);
}

export default RecipeFilter;
