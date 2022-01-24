import { useReducer, useState } from "react";
import Head from "next/head";

import EditIngredient from "../../components/form/EditIngredient";
import IngredientForm from "../../components/form/IngredientForm";
import MultipartForm from "../../components/form/MultipartForm";
import RecipeDescriptionForm from "../../components/form/RecipeDescriptionForm";
import ProcedureForm from "../../components/form/ProcedureForm";
import TagForm from "../../components/form/TagForm";
import {
    ingredientReducer,
    recipeDescriptionReducer,
    tagReducer,
    procedureReducer,
} from "../../reducers/newFormReducers";
import EditProcedure from "../../components/form/EditProcedure";
import { supabase } from "../../utils/supabaseClient";

function New({ data }) {
    const [recipeDescription, dipatchRecipeDescription] = useReducer(recipeDescriptionReducer, {
        dishTitle: "",
        description: "",
        prepTime: 0,
    });
    const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, []);
    const [procedure, dispatchProcedure] = useReducer(procedureReducer, []);
    const [tags, dispatchTag] = useReducer(tagReducer, []);

    const submitData = async () => {
        const response = await fetch("/api/new-recipe", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients, recipeDescription, procedure, tags }),
        });
        const res = await response.json();
    };

    return (
        <>
            <Head>
				<title>Recipes - new</title>
			</Head>
            <main className="container mx-auto flex flex-col h-screen items-center justify-center">
                <ul className="w-1/2 bg-red-400">
                    {ingredients.map((ing) => (
                        <EditIngredient key={ing.id} ing={ing} dispatch={dispatchIngredients} />
                    ))}
                    {procedure.length > 0 && <hr />}
                    {procedure.map((proc) => (
                        <EditProcedure key={proc.id} proc={proc} dispatch={dispatchProcedure} />
                    ))}
                    {tags.length > 0 && <hr />}
                    {tags.map((tag) => (
                        <p key={tag.id}>{tag.tag}</p>
                    ))}
                </ul>
                <MultipartForm
                    done={async () => {
                        dispatchIngredients({ type: "clear_ingredients" });
                        dipatchRecipeDescription({ type: "clear_desc" });
                        dispatchProcedure({ type: "clear_proc" });
                        dispatchTag({ type: "clear_tag" });
                        await submitData();
                    }}
                >
                    <RecipeDescriptionForm
                        recipeDescription={recipeDescription}
                        dispatch={dipatchRecipeDescription}
                    />
                    <IngredientForm dispatch={dispatchIngredients} />
                    <ProcedureForm dispatch={dispatchProcedure} />
                    <TagForm dispatch={dispatchTag} tags={data} />
                </MultipartForm>
            </main>
        </>
    );
}

export default New;

export async function getStaticProps(context) {
    const data = await supabase.from("tags").select("*");

    return {
        props: {
            data: data.body,
        }, // will be passed to the page component as props
    };
}
