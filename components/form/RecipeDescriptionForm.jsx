import { useState } from 'react';

function RecipeDescriptionForm({ recipeDescription, dispatch }) {
	const [name, setName] = useState(recipeDescription.dishTitle);
	const [desc, setDesc] = useState(recipeDescription.description);
	const [prepTime, setPrepTime] = useState(recipeDescription.prepTime);

	return (
		<>
			<label className="flex flex-col w-full" htmlFor="recipe-name">
				Recipe
				<input
					id="recipe-name"
					type="text"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
						dispatch({
							type: 'change_desc',
							payload: {
								dishTitle: name,
								description: desc,
								prepTime: prepTime,
							},
						});
					}}
				/>
			</label>
			<label className="flex flex-col w-full" htmlFor="recipe-desc">
				Description
				<input
					type="text"
					id="recipe-desc"
					value={desc}
					onChange={(e) => {
						setDesc(e.target.value);
						dispatch({
							type: 'change_desc',
							payload: {
								dishTitle: name,
								description: desc,
								prepTime: prepTime,
							},
						});
					}}
				/>
			</label>
			<label className="flex flex-col w-full" htmlFor="recipe-preptime">
				Prep Time
				<input
					type="number"
					id="recipe-preptime"
					value={prepTime}
					onChange={(e) => {
						setPrepTime(e.target.value);
						dispatch({
							type: 'change_desc',
							payload: {
								dishTitle: name,
								description: desc,
								prepTime: prepTime,
							},
						});
					}}
				/>
			</label>
		</>
	);
}

export default RecipeDescriptionForm;
