import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
	const recipe = JSON.parse(req.body);

	// delete tags from recipe
	const data = await supabase.from('recipes_tags').delete().eq('recipe', recipe.id);

	const updated = await supabase
		.from('recipes_tags')
		.insert(recipe.tags.map(({ tag, id }) => ({ tag: id, recipe: recipe.id })));

	// insert new tags from updated list in recipe
	// redirect to refresh page?
	res.redirect('/');
}
