import Link from 'next/link';
import PropTypes from 'prop-types';

import Tag from './Tag';

function RecipeCard({ recipe }) {
	const capitalize = (str) =>
		str
			.split(' ')
			.map((wd) => wd.slice(0, 1).toUpperCase() + wd.slice(1, wd.length))
			.join(' ');

	return (
		<Link passHref href={`/recipes/${recipe.slug}`}>
			<a aria-label={'recipe card ' + recipe.recipe_name} className="w-full">
				<article className="flex flex-col justify-between cursor-pointer w-full h-full min-h-[150px] transition-all duration-300 shadow-lg hover:shadow-xl bg-red-300 hover:bg-red-400 p-8 rounded-xl ">
					<header className="text-xl">{capitalize(recipe.recipe_name)}</header>
					<p>{recipe.description}</p>
					<div className="">
						<span>
							Prep time: {recipe.prep_time} {recipe.prep_time > 1 || recipe.prep_time === 0 ? 'minutes' : 'minute'}
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
								className="transition text-gray-600 bg-orange-400 hover:bg-orange-300 px-4 py-2 rounded-xl"
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

// RecipeCard.propTypes = {
// 	recipe: PropTypes.shape({
// 		id: PropTypes.string,
// 		dishTitle: PropTypes.string,
// 		slug: PropTypes.string,
// 		description: PropTypes.string,
// 		prepTime: PropTypes.number,
// 		totalTime: PropTypes.number,
// 		ingredients: PropTypes.arrayOf(
// 			PropTypes.shape({
// 				ingredient: PropTypes.string,
// 				amount: PropTypes.string || PropTypes.number,
// 				unit: PropTypes.string,
// 			})
// 		),
// 		procedure: PropTypes.arrayOf(PropTypes.string),
// 		tags: PropTypes.arrayOf(
// 			PropTypes.shape({
// 				tag: PropTypes.string,
// 				id: PropTypes.string,
// 			})
// 		),
// 	}),
// };
