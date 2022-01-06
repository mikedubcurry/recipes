import { supabase } from "../utils/supabaseClient";

import RecipeCard from "../components/RecipeCard";

export default function Home({ recipes, error }) {
    console.log(recipes);
    if (error) {
        return (
            <div className="container flex flex-col items-center justify-center m-auto h-full bg-red-400/50">
                <h1 className="text-xl mb-5">Sorry</h1>
                <p>Something went wrong...</p>
            </div>
        );
    }
    return (
        <div className="md:container sm:container grid md:grid-cols-2 gap-4 mx-2 sm:mx-auto py-4 p-auto h-full">
            {recipes && recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
    );
}

export async function getStaticProps() {
    let { data: recipes, error } = await supabase.from("recipes").select("*, tags (id, tag)");

    if (error) {
        return { props: { error } };
    }

    return {
        props: { recipes },
    };
}
