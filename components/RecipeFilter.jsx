import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

function RecipeFilter({ inputState, dispatch, tags, children }) {
	const [filterInput, setFilterInput] = inputState;
	const [tagsOpen, setTagsOpen] = useState(false);

	return (
		<div className="dark:bg-indigo-900 dark:text-slate-300 transition-all container relative bg-purple-200 p-2 rounded-xl shadow w-full flex-col items-center mb-4 flex justify-center gap-2 md:gap-4">
			<label className="z-10 self-start sm:self-center" htmlFor="filterRecipes">
				Filter Recipes:
			</label>
			<input
				className="dark:bg-slate-800 z-10 bg-slate-400 w-full rounded-xl px-8 py-2 text-black placeholder:text-gray-200"
				autoComplete="off"
				placeholder="Filter recipes..."
				id="filterRecipes"
				name="filterRecipe"
				type="text"
				value={filterInput}
				onChange={(e) => setFilterInput(e.target.value)}
			/>
			<div className="w-full z-10 flex flex-row-reverse justify-between">
				<button
					className="dark:bg-blue-800 dark:disabled:grayscale px-4 py-2 self-end rounded-lg bg-blue-300 disabled:bg-gray-400 disabled:text-gray-200"
					disabled={filterInput.length === 0 && tags.length === 0}
					onClick={() => {
						setFilterInput('');
						dispatch({ type: 'reset' });
					}}
				>
					Clear Filter
				</button>
				{tagsOpen ? (
					<button onClick={() => setTagsOpen(false)} className="dark:bg-blue-800 px-4 py-2 self-start rounded-lg bg-blue-300">
						Hide Tags
					</button>
				) : (
					<button onClick={() => setTagsOpen(true)} className="dark:bg-blue-800 px-4 py-2 self-start rounded-lg bg-blue-300">
						Show Tags
					</button>
				)}
			</div>
			<CSSTransition in={tagsOpen} timeout={200} classNames="tags">
				<div className="transition-all relative z-0 bottom-12 opacity-0">{tagsOpen ? children : ''}</div>
			</CSSTransition>
		</div>
	);
}

export default RecipeFilter;
