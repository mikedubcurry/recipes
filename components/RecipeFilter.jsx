function RecipeFilter({ inputState }) {
    const [filterInput, setFilterInput] = inputState;

    return (
        <div className="container w-1/4 flex-col md:flex-row items-center mb-4 flex justify-between">
            <label htmlFor="filterRecipes">Filter:</label>
            <input
                className="bg-slate-400 px-8 py-2 text-black rounded-xl placeholder:text-gray-200"
                autoComplete="off"
                placeholder="Filter recipes"
                id="filterRecipes"
                name="filterRecipe"
                type="text"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
            />
            <button onClick={() => setFilterInput("")}>Clear Filter</button>
        </div>
    );
}

export default RecipeFilter;
