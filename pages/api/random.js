import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	const { data: recipes, error } = await supabase.from('recipes').select('*');

	if (error) {
		res.redirect(500);
	}

	let randomIndex = Math.floor(Math.random() * recipes.length);
	let recipe = recipes[randomIndex];

	res.redirect(303, `/recipes/${recipe.slug}`);
}
