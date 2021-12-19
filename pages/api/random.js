import { promises as fs } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
	const recipePath = join(process.cwd(), 'recipes');

	const filenames = await fs.readdir(recipePath);

	const randomFile = filenames[Math.floor(Math.random() * filenames.length)];

	const recipe = await fs.readFile(join(recipePath, randomFile), 'utf-8');

	res.redirect(303, `/recipes/${JSON.parse(recipe).slug}`);
}
