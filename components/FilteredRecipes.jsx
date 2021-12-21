import { useEffect, useState } from "react";

import RecipeCard from "./RecipeCard";
import RecipeFilter from './RecipeFilter'

function FilteredRecipes({ recipes }) {
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);
    const [filterInput, setFilterInput] = useState("");

    useEffect(() => {
        if (filterInput) {
            let filtered = recipes.filter((recipe) => {
                return (
                    ingredientsInclude(recipe, filterInput) || dishTitleInclude(recipe, filterInput)
                );
            });
            setFilteredRecipes(filtered);
        } else {
            setFilteredRecipes(recipes);
        }
    }, [filterInput]);

    return (
        <section className="py-4 flex flex-col items-center">
            <RecipeFilter inputState={[filterInput, setFilterInput]} />
            {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.dishTitle} recipe={recipe} />
            ))}
        </section>
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
