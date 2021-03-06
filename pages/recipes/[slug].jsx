import { supabase } from '../../utils/supabaseClient';
import Head from 'next/head';

import TagList from '../../components/TagList';
import ActionButton from '../../components/ActionBtn';
import { useReducer, useState } from 'react';
import Image from 'next/image';

function RecipePage({ recipe, allTags }) {
	const [editTags, setEditTags] = useState(false);
	const [tags, dispatchTags] = useReducer(tagsReducer, recipe.tags);
	const [addingTags, setAddingTags] = useState(false);

	const updateTags = async () => {
		const res = await fetch('/api/edit-tags', {
			method: 'post',
			body: JSON.stringify({ ...recipe, tags }),
		});
		const data = await res.json();
	};

	let extraTags = allTags.filter((tag) => !tags.map((t) => t.id).includes(tag.id));

	const myLoader = ({ src }) => {
		return src;
	};
	console.log(recipe);
	return (
		<>
			<Head>
				<title>Recipes - {recipe.recipe_name}</title>
			</Head>
			<div className="container m-auto py-4 p-auto px-2">
				<header className="min-h-72 flex flex-col justify-between items-center">
					<h1 className="text-3xl">{recipe.recipe_name}</h1>
					<figure>
						<Image
							src={recipe.img ? recipe.img : '/notfound.webp'}
							alt={recipe.description}
							layout="responsive"
							width={200}
							height={200}
							className="max-h-52 w-full object-contain object-center"
							loader={myLoader}
						/>

						<figcaption className="text-slate-600 text-center">{recipe.description}</figcaption>
					</figure>
					<aside>
						<strong>Prep Time</strong>
						<br />
						{recipe.prep_time} {recipe.prep_time <= 1 ? 'minute' : 'minutes'}
					</aside>

					<div className="w-1/2 mb-4">
						<div>
							{editTags ? (
								<>
									<ActionButton
										type="warn"
										btnText="Cancel"
										handleClick={() => {
											setEditTags(false);
											setAddingTags(false);
											// set current tags to initial value
											dispatchTags({
												type: 'reset_tag',
												payload: recipe.tags,
											});
										}}
									/>
									<ActionButton
										type="success"
										btnText="Save Changes"
										handleClick={() => {
											setEditTags(false);
											setAddingTags(false);
											// trigger /api/edit-tags
											updateTags();
										}}
									/>
								</>
							) : (
								<ActionButton btnText="Edit Tags" handleClick={() => setEditTags(true)} />
							)}
						</div>
						<TagList
							onEdit={() => setAddingTags(true)}
							editing={editTags}
							tags={tags}
							dispatch={dispatchTags}
							selectedTags={[tags.map(({ id }) => id)]}
						/>
						{addingTags && <TagList tags={extraTags} dispatch={dispatchTags} editing={''} selectedTags={[]} />}
					</div>
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
		</>
	);
}

export async function getStaticProps(context) {
	const { slug } = context.params;
	const { data, error } = await supabase.from('recipes').select('*, tags (id, tag)').eq('slug', slug);
	if (error) {
		console.log('something happened...', error);
		return;
	}
	const recipe = {
		cook: data[0].cook,
		description: data[0].description,
		procedure: data[0].procedure,
		ingredients: data[0].ingredients,
		tags: data[0].tags,
		recipe_name: data[0].recipe_name,
		img: data[0].img,
		id: data[0].id,
	};
    
	const { data: allTags } = await supabase.from('tags').select('*');

	return {
		props: { recipe, allTags },
	};
}

export async function getStaticPaths() {
	const { data: slugs, error } = await supabase.from('recipes').select('slug');

	return { paths: slugs.map((slug) => ({ params: slug })), fallback: false };
}

export default RecipePage;

function tagsReducer(tags, action) {
	switch (action.type) {
		case 'remove_tag':
			console.log(tags);
			return tags.filter(({ id }) => id !== action.payload.id);
		case 'add_tag':
			return [...tags, action.payload];
		case 'reset_tag':
			return action.payload;
		default:
			return tags;
	}
}
