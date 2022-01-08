import { useEffect, useReducer, useState } from 'react';
import FilterBar from './FilterBar';

import RecipeCard from './RecipeCard';
import RecipeFilter from './RecipeFilter';
import TagList from './TagList';

function FilteredRecipes({ recipes, tags }) {
	const [filteredRecipes, setFilteredRecipes] = useState(recipes);
	const [filterInput, setFilterInput] = useState('');
	const [selectedTags, dispatch] = useReducer(tagsReducer, []);

	useEffect(() => {
		if (filterInput) {
			let filtered = recipes.filter((recipe) => {
				return ingredientsInclude(recipe, filterInput) || dishTitleInclude(recipe, filterInput);
			});
			setFilteredRecipes(filtered);
		} else {
			setFilteredRecipes(recipes);
		}
	}, [filterInput]);

	return (
		<>
			<div className="col-start-1 col-end-3">
				<RecipeFilter tags={selectedTags} dispatch={dispatch} inputState={[filterInput, setFilterInput]} />
				<TagList selectedTags={selectedTags} dispatch={dispatch} tags={tags} />
			</div>
			{filteredRecipes.map((recipe) => (
				<RecipeCard key={recipe.id} recipe={recipe} />
			))}
		</>
	);
}

export default FilteredRecipes;

function ingredientsInclude(recipe, input) {
	return recipe.ingredients.filter((ing) => {
		return ing.ingredient.toLowerCase().trim().includes(input.toLowerCase().trim());
	}).length;
}

function dishTitleInclude(recipe, input) {
	return recipe.recipe_name.toLowerCase().trim().includes(input.toLowerCase().trim());
}

function tagsReducer(tagIds, action) {
	switch (action.type) {
		case 'select':
			return [...tagIds, action.payload];
		case 'deselect':
			return tagIds.filter((id) => action.payload !== id);
		case 'reset':
			return [];
		default:
			return tagIds;
	}
}
