export function ingredientReducer(ings, action) {
	switch (action.type) {
		case 'add_ingredient':
			if (!ings.map((i) => i.ingredient).includes(action.payload.ingredientName)) {
				let ing = {
					ingredient: action.payload.ingredientName,
					unit: action.payload.unit,
					amount: action.payload.amount,
					id: action.payload.id,
				};
				return [...ings, ing];
			}
		case 'remove_ingredient':
			return ings.filter((i) => i.ingredient !== action.payload.ingredient);
		case 'edit_ingredient':
			return ings.map((i) => (i.id === action.payload.id ? { ...action.payload, id: uuid() } : i));
		case 'clear_ingredients':
			return [];
		default:
			return ings;
	}
}

export function recipeDescriptionReducer(desc, action) {
	switch (action.type) {
		case 'change_desc':
			return action.payload;
		case 'clear_desc':
			return {
				dishTitle: '',
				description: '',
				prepTime: 0,
			};
		default:
			return desc;
	}
}

export function procedureReducer(proc, action) {
	switch (action.type) {
		case 'add_proc':
			return [...proc, action.payload];
		case 'edit_proc':
			return proc.map((p) => {
				return action.payload.id !== p.id ? p : action.payload;
			});
		case 'remove_proc':
			return proc.filter((p) => p.id !== action.payload.id);
		case 'clear_proc':
			return [];
		default:
			return proc;
	}
}

export function tagReducer(tags, action) {
	switch (action.type) {
		case 'remove_tag':
			return tags.filter((t) => t.id !== action.payload.id);
		case 'add_tag':
			return [...tags, action.payload];
		case 'clear_tag':
			return [];
		default:
			return tags;
	}
}
