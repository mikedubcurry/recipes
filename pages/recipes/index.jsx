import { join } from 'path';
import { promises as fs } from 'fs';

import RecipeCard from '../../components/RecipeCard';

function AllRecipes({ recipes }) {
	return (
		<ul>
			{recipes.map((recipe) => (
				<li key={recipe.dishTitle}>
					<RecipeCard recipe={recipe} />
				</li>
			))}
		</ul>
	);
}

export async function getStaticProps(context) {
	const recipePath = join(process.cwd(), 'recipes');

	const filenames = await fs.readdir(recipePath);

	const recipes = filenames.map(async (filename) => {
		const filePath = join(recipePath, filename);
		const recipe = await fs.readFile(filePath, 'utf-8');

		return JSON.parse(recipe);
	});

	return {
		props: { recipes: await Promise.all(recipes) },
	};
}

export default AllRecipes;
