import { useEffect, useReducer, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FilterBar from './FilterBar';

import RecipeCard from './RecipeCard';
import RecipeFilter from './RecipeFilter';
import TagList from './TagList';

function FilteredRecipes({ recipes, tags }) {
	const [filteredRecipes, setFilteredRecipes] = useState(recipes);
	const [filterInput, setFilterInput] = useState('');
	const [selectedTags, dispatch] = useReducer(tagsReducer, []);

	useEffect(() => {
		if (filterInput || selectedTags.length) {
			let filtered = recipes.filter((recipe) => {
				return ingredientsInclude(recipe, filterInput) || dishTitleInclude(recipe, filterInput);
			});

			filtered = filtered.filter((recipe) => {
				return tagsInclude(recipe, selectedTags);
			});

			setFilteredRecipes(filtered);
		} else {
			setFilteredRecipes(recipes);
		}
	}, [filterInput, selectedTags]);

	return (
		<>
			<div className="">
				<RecipeFilter tags={selectedTags} dispatch={dispatch} inputState={[filterInput, setFilterInput]}>
				<TagList editing={null} selectedTags={selectedTags.map(({ id }) => id)} dispatch={dispatch} tags={tags} />
				</RecipeFilter>
			</div>
			<TransitionGroup
				className="md:container sm:container grid md:grid-cols-2 gap-4 py-4 h-full"
				component="section"
			>
				{filteredRecipes.map((recipe) => (
					<CSSTransition classNames="item" timeout={300} key={recipe.id}>
						<RecipeCard key={recipe.id} recipe={recipe} />
					</CSSTransition>
				))}
			</TransitionGroup>
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

function tagsInclude(recipe, tags) {
	let recipeTags = recipe.tags.map(({ id }) => id);

	for (let { id } of tags) {
		if (!recipeTags.includes(id)) {
			return false;
		}
	}
	return true;
}

function tagsReducer(tags, action) {
	switch (action.type) {
		case 'add_tag':
			return [...tags, action.payload];
		case 'remove_tag':
			return tags.filter(({ id }) => action.payload.id !== id);
		case 'reset':
			return [];
		default:
			return tags;
	}
}
