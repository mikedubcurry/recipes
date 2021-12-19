import { useRouter } from 'next/router';
import { promises as fs } from 'fs';
import { join } from 'path';

function RecipePage({ recipe }) {
	return (
		<div>
			<header>{recipe.dishTitle}</header>
			<ul>
				{recipe.ingredients.map((ing) => (
					<li key={ing.ingredient}>
						<p>{ing.ingredient}</p>
						<span>
							{ing.amount} {ing.unit}
						</span>
					</li>
				))}
			</ul>

			<p>Instructions:</p>
			<ol>
				{recipe.procedure.map((step) => (
					<li key={step}>
						<p>{step}</p>
					</li>
				))}
			</ol>
		</div>
	);
}

export async function getStaticProps(context) {
	const { slug } = context.params;
	const recipePath = join(process.cwd(), 'recipes');
	const recipe = await fs.readFile(join(recipePath, slug + '.json'), 'utf-8');

	return { props: { recipe: JSON.parse(recipe) } };
}

export async function getStaticPaths() {
	const recipePath = join(process.cwd(), 'recipes');

	const filenames = await fs.readdir(recipePath);

	const slugs = filenames.map(async (filename) => {
		const filePath = join(recipePath, filename);
		const recipe = await fs.readFile(filePath, 'utf-8');

		return { params: { slug: JSON.parse(recipe).slug } };
	});

	return { paths: await Promise.all(slugs), fallback: false };
}

export default RecipePage;
