import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	const recipe = req.body;
	console.log(recipe);
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
	}

	const slug = recipe.recipeDescription.dishTitle
		.split(' ')
		.map((w) => w.toLowerCase())
		.map((w) => w.replace(/[^a-z]/g, ''))
		.join('-');

	const cook = process.env.COOK_ID || ''
		
	const result = await supabase.from('recipes').insert([
		{
			recipe_name: recipe.recipeDescription.dishTitle,
			description: recipe.recipeDescription.description,
			slug,
			ingredients: recipe.ingredients,
			procedure: recipe.procedure.map(p => p.txt),
			prep_time: recipe.recipeDescription.prepTime,
			cook,
		},
	]);
	//  tags exist
	// if recipe is created, add tag link to recipe_tag table
	res.send({ result });
}
