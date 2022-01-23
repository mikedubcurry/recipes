import { mysql_real_escape_string } from '../../utils/escape';
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	const recipe = req.body;

	if (!recipe) {
		res.status(400).send({ error: 'must pass recipe' });
		return;
	}
	if (!recipe.ingredients || !recipe.recipeDescription || !recipe.procedure) {
		res.status(400).send({ error: 'must pass recipe' });
		return;
	}
	// verify recipe data
	//  dishTitle is a string
	if (!recipe.recipeDescription.dishTitle) {
		res.status(400).send({ error: 'must pass dish name' });
		return;
	}
	//  description is a string
	if (!recipe.recipeDescription.description) {
		res.status(400).send({ error: 'must pass description' });
		return;
	} //  prepTimeis a number
	if (!recipe.recipeDescription.prepTime || !parseInt(recipe.recipeDescription.prepTime)) {
		res.status(400).send({ error: 'must pass prep time' });
		return;
	}
	//  ingredients exists
	if (!recipe.ingredients.length) {
		res.status(400).send({ error: 'must pass ingredients' });
		return;
	}
	//  procedure exists
	if (!recipe.procedure.length) {
		res.status(400).send({ error: 'must pass procedure' });
		return;
	}

	const slug = mysql_real_escape_string(recipe.recipeDescription.dishTitle)
		.split(' ')
		.map((w) => w.toLowerCase())
		.map((w) => w.replace(/[^a-z]/g, ''))
		.filter((w) => w)
		.join('-');

	if (!slug.trim()) {
		res.status(400).send({ error: 'mustve passed some crazy characters there...' });
		return;
	}

	const cook = process.env.COOK_ID || '';

	const { data, error } = await supabase.from('recipes').insert([
		{
			recipe_name: mysql_real_escape_string(recipe.recipeDescription.dishTitle),
			description: mysql_real_escape_string(recipe.recipeDescription.description),
			slug,
			ingredients: recipe.ingredients.map((ing) => {
				return {
					...ing,
					ingredient: mysql_real_escape_string(ing.ingredient),
					unit: mysql_real_escape_string(ing.unit),
				};
			}),
			procedure: recipe.procedure.map((p) => mysql_real_escape_string(p.txt)),
			prep_time: recipe.recipeDescription.prepTime,
			cook,
		},
	]);
	if (error) {
		// console.log({data, error});
		res.send({ error });
		return;
	}
	let [rec] = data;
	//  tags exist
	if (recipe.tags && recipe.tags.length) {
		let tags = recipe.tags;
		const tagResult = await supabase.from('recipes_tags').insert(
			tags.map((t) => {
				return { tag: t.id, recipe: rec.id };
			})
		);
	}

	res.send({ recipe: rec });
}
