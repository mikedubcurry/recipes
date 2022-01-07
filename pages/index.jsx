import { supabase } from "../utils/supabaseClient";

import RecipeCard from "../components/RecipeCard";
import FilterBar from "../components/FilterBar";
import RecipeFilter from "../components/RecipeFilter";
import { useState } from "react";
import TagList from "../components/TagList";

export default function Home({ recipes, tags, error }) {
    const [selectedTags, setSelectedTags] = useState([]);
    // const [filterInput, setFilterInput] = useState("");
    // const filteredRecipes = recipes.filter((recipe) => {
    //     console.log(recipe);
    //     if (!filterInput) return true;
    //     return recipe.recipe_name.toLowerCase().includes(filterInput.toLowerCase());
    // });

    if (error) {
        return (
            <div className="container flex flex-col items-center justify-center m-auto h-full bg-red-400/50">
                <h1 className="text-xl mb-5">Sorry</h1>
                <p>Something went wrong...</p>
            </div>
        );
    }
    return (
        <>
            <TagList selectedState={[selectedTags, setSelectedTags]} tags={tags} />
            <div className="md:container sm:container grid md:grid-cols-2 gap-4 mx-2 sm:mx-auto py-4 p-auto h-full">
                {recipes && recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
                {/* <RecipeFilter inputState={[filterInput, setFilterInput]} /> */}
            </div>
        </>
    );
}

export async function getStaticProps() {
    let { data: recipes, error } = await supabase.from("recipes").select("*, tags (id, tag)");

    if (error) {
        return { props: { error } };
    }

    let { data: tags } = await supabase.from("tags").select("*");

    return {
        props: { recipes, tags },
    };
}
