import Link from "next/link";
import PropTypes from "prop-types";

function RecipeCard({ recipe }) {
    return (
        <Link href={`/recipes/${recipe.slug}`}>
            <article className="cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl bg-red-300 hover:bg-red-400 p-8 rounded-xl">
                <header className="text-xl">{recipe.dishTitle}</header>
                <p>{recipe.description}</p>
            </article>
        </Link>
    );
}

export default RecipeCard;

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        dishTitle: PropTypes.string,
        slug: PropTypes.string,
        description: PropTypes.string,
        prepTime: PropTypes.number,
        totalTime: PropTypes.number,
        ingredients: PropTypes.arrayOf(
            PropTypes.shape({
                ingredient: PropTypes.string,
                amount: PropTypes.number,
                unit: PropTypes.string,
            })
        ),
        procedure: PropTypes.arrayOf(PropTypes.string),
    }),
};
