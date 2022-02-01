import Link from "next/link";

import { capitalize } from "../utils/capitalize";
import Tag from "./Tag";

function RecipeCard({ recipe }) {
    return (
        <Link passHref href={`/recipes/${recipe.slug}`}>
            <a aria-label={"recipe card " + recipe.recipe_name} className="w-full">
                <article className="dark:bg-indigo-900 dark:text-slate-300 dark:hover:bg-violet-900 flex flex-col gap-2 justify-between cursor-pointer w-full h-full min-h-[150px] transition-all duration-300 shadow-lg hover:shadow-xl bg-yellow-200 hover:bg-yellow-400 p-8 rounded-xl ">
                    <header className="text-xl underline decoration-1 decoration-yellow-100">
                        {capitalize(recipe.recipe_name)}
                    </header>
                    <p>{recipe.description}</p>
                    <div className="italic">
                        <span>
                            Prep time: {recipe.prep_time}{" "}
                            {recipe.prep_time > 1 || recipe.prep_time === 0 ? "minutes" : "minute"}
                        </span>
                    </div>
                    <ul className="flex-wrap rounded flex justify-evenly gap-4">
                        {recipe.tags.slice(0, 4).map(
                            // truncate tags if longer than 4
                            ({ tag, id }) => (
                                <Tag tag={{ tag, id }} key={id} />
                            )
                        )}
                        {recipe.tags.length > 4 ? (
                            <li
                                className="dark:bg-rose-900 transition text-gray-600 bg-orange-400 hover:bg-orange-300 px-4 py-2 rounded-xl"
                                key="truncated"
                            >
                                {recipe.tags.length - 4} more tags
                            </li>
                        ) : null}
                    </ul>
                </article>
            </a>
        </Link>
    );
}

export default RecipeCard;
