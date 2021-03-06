import { supabase } from "../utils/supabaseClient";
import Head from "next/head";

import RecipeCard from "../components/RecipeCard";
import FilterBar from "../components/FilterBar";
import FilteredRecipes from "../components/FilteredRecipes";
import TagList from "../components/TagList";

export default function Home({ recipes, tags, error }) {
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
            <Head>
                <title>Recipes</title>
            </Head>
            <div
                aria-live="polite"
                className="md:container sm:container mx-2 sm:mx-auto py-4 p-auto px-2 h-full"
            >
                <FilteredRecipes tags={tags} recipes={recipes} />
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
