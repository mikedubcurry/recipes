import { useReducer, useState } from 'react';
import EditIngredient from '../../components/form/EditIngredient';
import IngredientForm from '../../components/form/IngredientForm';
import {v4 as uuid} from 'uuid'

function New() {
	const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, []);
	console.log(ingredients);
	return (
		<main className="container mx-auto flex flex-col h-screen items-center justify-between">
			<ul className="w-1/2">
				{ingredients.map((ing) => (
					<EditIngredient key={ing.id} ing={ing} dispatch={dispatchIngredients} />
				))}
			</ul>
			<IngredientForm ingredients={ingredients} dispatch={dispatchIngredients} />
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
					amount: parseInt(action.payload.amount),
					id: action.payload.id,
				};
				return [...ings, ing];
			}
		case 'remove_ingredient':
			return ings.filter((i) => i.ingredient !== action.payload.ingredient);
		case 'edit_ingredient':
			return ings.map((i) => (i.id === action.payload.id ? {...action.payload, id: uuid()} : i));
		default:
			return ings;
	}
}
