import { useEffect, useState } from "react";

import RecipeCard from "./RecipeCard";

function FilteredRecipes({ recipes }) {
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
    const [filterInput, setFilterInput] = useState("");

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
            <label htmlFor="filterRecipes"></label>
            <input
                autoComplete="off"
                placeholder="Filter recipes"
                id="filterRecipe"
                name="filterRecipe"
                type="text"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
            />
            {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.dishTitle} recipe={recipe} />
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
    return recipe.dishTitle.toLowerCase().trim().includes(input.toLowerCase().trim());
}
