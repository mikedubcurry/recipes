import { useState } from 'react';

function RecipeDescriptionForm({ dispatch }) {
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [prepTime, setPrepTime] = useState(0);

	return (
		<>
			<label htmlFor="recipe-name">
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
			<label htmlFor="recipe-desc">
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
			<label htmlFor="recipe-preptime">
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
