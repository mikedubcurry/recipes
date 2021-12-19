import RecipeCard from '../components/RecipeCard';

export default function Home() {
	return (
		<div className="text-red-500">
			<RecipeCard
				recipe={{
					dishTitle: 'Bang Bang Tofu',
					description:
						'A nice spin on tofu with a crispy panko coating and a spicy sriacha sauce. Goes great with broccoli or sauteed brussles sprouts.',

					prepTime: 15,
					totalTime: 45,
					ingredients: [
						{ ingredient: 'Extra Firm Tofu', amount: 1, unit: 'block' },
						{ ingredient: 'Panko Bread Crumbs', amount: 3, unit: 'cups' },
						{ ingredient: 'Garlic Powder', amount: 2, unit: 'teaspoons' },
						{ ingredient: 'Onion Powder', amount: 1, unit: 'teaspoon' },
						{ ingredient: 'Salt', amount: 0.5, unit: 'teaspoon' },
						{ ingredient: 'Black Pepper', amount: 1, unit: 'teaspoon' },
						{ ingredient: 'Water', amount: 1, unit: 'cup' },
						{ ingredient: 'Flour', amount: 1, unit: 'cup' },
						{ ingredient: 'Vegan Mayo', amount: 1, unit: 'cup' },
						{ ingredient: 'Sriacha', amount: 2, unit: 'tablespoons' },
						{ ingredient: 'Rice Wine Vinegar', amount: 1, unit: 'teaspoon' },
					],
					procedure: [
						'Pre-heat oven to 350 degrees.',
						'Drain and Press tofu to remove some excess water. Cut tofu into 3/4 inch cubes and set them aside.',
						'In a large bowl, add flour, garlic and onion powder, salt, and water and mix.',
						'In a second bowl, add panko bread crumbs.',
						'Line a baking tray with parchment paper or aluminum foil.',
						'Start by dipping the tofu cubes into the flour-water mixture and then coating with panko, finally place it on the baking tray. Repeat until all of the tofu cubes have been covered with bread crumbs.',
						'Once all the tofu cubes have been coated, and the oven is pre-heated, place them on the center rack for about 15-18 minutes, or until the panko is light brown. Leave in a little longer for a crsipier finish.',
						'While the tofu is cooking, add the mayo, sriacha and rice wine vinegar to a small bowl and mix well.',
						'When the tofu has finished cooking, you can plate them and use the sauce to dip, or you can coat the baked tofus in the sauce (this will make them less crispy).',
					],
				}}
			/>
		</div>
	);
}
