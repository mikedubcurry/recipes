import { supabase } from '../../utils/supabaseClient';

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
	const { data: recipe, error } = await supabase.from('recipes').select('*').eq('slug', slug);
	if (error) {
		console.log('something happened...', error);
		return;
	}

	return {
		props: { recipe: recipe[0] },
	};
}

export async function getStaticPaths() {
	const { data: slugs, error } = await supabase.from('recipes').select('slug');

	return { paths: slugs.map(slug => ({params: slug})), fallback: false };
}

export default RecipePage;
