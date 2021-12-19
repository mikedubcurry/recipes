import { promises as fs } from 'fs';
import { join } from 'path';

import RecipeCard from '../components/RecipeCard';

export default function Home({ recipes }) {
	return (
		<div className="container mx-auto">
			{recipes.map((recipe) => (
				<RecipeCard key={recipe.filename} recipe={recipe.contents} />
			))}
		</div>
	);
}

export async function getStaticProps(context) {
	const recipePath = join(process.cwd(), 'recipes');

	const filenames = await fs.readdir(recipePath);

	const recipes = filenames.map(async (filename) => {
		const filePath = join(recipePath, filename);
		const recipe = await fs.readFile(filePath, 'utf-8');

		return { filename, contents: JSON.parse(recipe) };
	});

	return {
		props: { recipes: await Promise.all(recipes) },
	};
}
