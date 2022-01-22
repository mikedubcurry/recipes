import { supabase } from "../../utils/supabaseClient";

import RecipeCard from "../../components/RecipeCard";

function AllRecipes({ recipes }) {
    return (
        <ul className="container m-auto">
            {recipes.map((recipe) => (
                <li key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {
    let { data: recipes, error } = await supabase.from("recipes").select("*, tags (id, tag)");

    return {
        props: { recipes },
    };
}

export default AllRecipes;
