import { promises as fs } from "fs";
import { join } from "path";
import FilteredRecipes from "../components/FilteredRecipes";

import RecipeCard from "../components/RecipeCard";

export default function Home({ recipes }) {
    return (
        <div className="container mx-auto">
            <FilteredRecipes recipes={recipes} />
        </div>
    );
}

export async function getStaticProps(context) {
    const recipePath = join(process.cwd(), "recipes");

    const filenames = await fs.readdir(recipePath);

    const recipes = filenames.map(async (filename) => {
        const filePath = join(recipePath, filename);
        const recipe = await fs.readFile(filePath, "utf-8");

        return JSON.parse(recipe);
    });

    return {
        props: { recipes: await Promise.all(recipes) },
    };
}
