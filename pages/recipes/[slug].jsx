import { supabase } from '../../utils/supabaseClient';

function RecipePage({ recipe }) {
	return (
		<div className="container m-auto py-4 p-auto px-2">
			<header className="min-h-72">
				<h1 className="text-3xl">{recipe.recipe_name}</h1>
				<figure>
					<img
						src={recipe.img ? recipe.img : '/notfound.webp'}
						alt={recipe.description}
						className="max-h-52 w-full object-contain object-center"
						width="200"
						height="200"
					/>
					<figcaption className="text-slate-600 text-center">{recipe.description}</figcaption>
				</figure>
				<aside>
					<strong>Prep Time</strong>
					<br />
					{recipe.prep_time} {recipe.prep_time <= 1 ? 'minute' : 'minutes'}
				</aside>
			</header>
			<section className="bg-yellow-600 -mx-2 px-2 py-4">
				<h2 className="text-xl">Ingredients</h2>
				<ul className="list-disc">
					{recipe.ingredients.map((ing) => (
						<li className="list-disc ml-10" key={ing.ingredient}>
							<p>{ing.ingredient}</p>
							<span>
								{ing.amount} {ing.unit}
							</span>
						</li>
					))}
				</ul>
			</section>
			<section className="bg-purple-600 -mx-2 px-2 py-4">
				<h2 className="text-xl">Instructions:</h2>
				<ol>
					{recipe.procedure.map((step) => (
						<li className="list-decimal ml-10" key={step}>
							<p>{step}</p>
						</li>
					))}
				</ol>
			</section>
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

	return { paths: slugs.map((slug) => ({ params: slug })), fallback: false };
}

export default RecipePage;
