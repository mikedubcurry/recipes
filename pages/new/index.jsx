import { useReducer, useState } from 'react';
import EditIngredient from '../../components/form/EditIngredient';
import IngredientForm from '../../components/form/IngredientForm';
import { v4 as uuid } from 'uuid';
import MultipartForm from '../../components/form/MultipartForm';
import RecipeDescriptionForm from '../../components/form/RecipeDescriptionForm';

function New() {
	const [recipeDescription, dipatchRecipeDescription] = useReducer(recipeDescriptionReducer, {
		dishTitle: '',
		description: '',
		prepTime: 0,
	});
	const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, []);

	return (
		<main className="container mx-auto flex flex-col h-screen items-center justify-between">
			<ul className="w-1/2">
				{ingredients.map((ing) => (
					<EditIngredient key={ing.id} ing={ing} dispatch={dispatchIngredients} />
				))}
			</ul>
			<MultipartForm
				onComplete={() => {
					console.log({ ingredients, recipeDescription });
					dispatchIngredients({ type: 'clear_ingredients' });
					dipatchRecipeDescription({ type: 'clear_desc' });
				}}
			>
				<RecipeDescriptionForm dispatch={dipatchRecipeDescription} />
				<IngredientForm ingredients={ingredients} dispatch={dispatchIngredients} />
			</MultipartForm>
		</main>
	);
}

export default New;

function ingredientReducer(ings, action) {
	switch (action.type) {
		case 'add_ingredient':
			if (!ings.map((i) => i.ingredient).includes(action.payload.ingredientName)) {
				let ing = {
					ingredient: action.payload.ingredientName,
					unit: action.payload.unit,
					amount: action.payload.amount,
					id: action.payload.id,
				};
				return [...ings, ing];
			}
		case 'remove_ingredient':
			return ings.filter((i) => i.ingredient !== action.payload.ingredient);
		case 'edit_ingredient':
			return ings.map((i) => (i.id === action.payload.id ? { ...action.payload, id: uuid() } : i));
		case 'clear_ingredients':
			return [];
		default:
			return ings;
	}
}

function recipeDescriptionReducer(desc, action) {
	switch (action.type) {
		case 'change_desc':
			return action.payload;
		case 'clear_desc':
			return {
				dishTitle: '',
				description: '',
				prepTime: 0,
			};
		default:
			return desc;
	}
}
