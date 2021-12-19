import PropTypes from 'prop-types';

function RecipeCard({ recipe }) {
	return (
		<article>
			<header>{recipe.dishTitle}</header>
      <p>{recipe.description}</p>
		</article>
	);
}

export default RecipeCard;

RecipeCard.propTypes = {
	recipe: PropTypes.shape({
		dishTitle: PropTypes.string,
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
