import { supabase } from '../../utils/supabaseClient';

import RecipeCard from '../../components/RecipeCard';

function AllRecipes({ recipes }) {

	return (
		<ul className="container m-auto min-w-fill">
			{recipes.map((recipe) => (
				<li key={recipe.id}>
					<RecipeCard recipe={recipe} />
				</li>
			))}
		</ul>
	);
}

export async function getStaticProps(context) {
	let { data: recipes, error } = await supabase.from('recipes').select('*');

	return {
		props: { recipes },
	};
}

export default AllRecipes;
