import { useReducer, useState } from 'react';
import { v4 as uuid } from 'uuid';

import EditIngredient from '../../components/form/EditIngredient';
import IngredientForm from '../../components/form/IngredientForm';
import MultipartForm from '../../components/form/MultipartForm';
import RecipeDescriptionForm from '../../components/form/RecipeDescriptionForm';
import ProcedureForm from '../../components/form/ProcedureForm';
import TagForm from '../../components/form/TagForm';
import {
	ingredientReducer,
	recipeDescriptionReducer,
	tagReducer,
	procedureReducer,
} from '../../reducers/newFormReducers';
import EditProcedure from '../../components/form/EditProcedure';

function New() {
	const [recipeDescription, dipatchRecipeDescription] = useReducer(recipeDescriptionReducer, {
		dishTitle: '',
		description: '',
		prepTime: 0,
	});
	const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, []);
	const [procedure, dispatchProcedure] = useReducer(procedureReducer, []);
	const [tags, dispatchTag] = useReducer(tagReducer, []);

	return (
		<main className="container mx-auto flex flex-col h-screen items-center justify-between">
			<ul className="w-1/2">
				{ingredients.map((ing) => (
					<EditIngredient key={ing.id} ing={ing} dispatch={dispatchIngredients} />
				))}
				{procedure.length > 0 && <hr />}
				{procedure.map((proc) => (
					<EditProcedure key={proc.id} proc={proc} dispatch={dispatchProcedure} />
				))}
				{tags.length > 0 && <hr />}
				{tags.map((tag) => (
					<p key={tag.id}>{tag.tag}</p>
				))}
			</ul>
			<MultipartForm
				done={() => {
					console.log({ ingredients, recipeDescription, procedure, tags });
					dispatchIngredients({ type: 'clear_ingredients' });
					dipatchRecipeDescription({ type: 'clear_desc' });
					dispatchProcedure({ type: 'clear_proc' });
					dispatchTag({type: 'clear_tag'})
				}}
			>
				<RecipeDescriptionForm recipeDescription={recipeDescription} dispatch={dipatchRecipeDescription} />
				<IngredientForm dispatch={dispatchIngredients} />
				<ProcedureForm dispatch={dispatchProcedure} />
				<TagForm dispatch={dispatchTag} />
			</MultipartForm>
		</main>
	);
}

export default New;
