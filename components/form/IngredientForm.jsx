import { useState } from 'react';
import { v4 as uuid } from 'uuid';

function IngredientForm({ ingredients, dispatch }) {
	const [ingredientName, setIngName] = useState('');
	const [unit, setUnit] = useState('');
	const [amount, setAmount] = useState(0);

	const validateIngredient = () => {
		if (!ingredientName.length > 0) {
			return false;
		}
		if (!unit.length > 0 || unit.length > 15) {
			return false;
		}
		if (amount <= 0) {
			return false;
		}
		return true;
	};

	const addIngredient = () => {
		if (validateIngredient()) {
			const unitLastLetter = unit.slice(unit.length - 1);
			dispatch({
				type: 'add_ingredient',
				payload: {
					ingredientName,
					unit: amount !== 1 && unitLastLetter !== 's' ? unit + 's' : unit,
					amount,
					id: uuid(),
				},
			});
			setIngName('');
			setUnit('');
			setAmount(0);
		}
	};

	return (
		<>
			<form className="flex flex-col h-1/4 w-80 justify-between">
				<input
					type="text"
					value={ingredientName}
					onChange={(e) => {
						setIngName(e.target.value);
					}}
				/>
				<input
					type="text"
					value={unit}
					onChange={(e) => {
						setUnit(e.target.value);
					}}
				/>
				<input
					type="number"
					value={amount}
					onChange={(e) => {
						setAmount(e.target.value);
					}}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						addIngredient();
					}}
				>
					Add Ingredient
				</button>
			</form>
		</>
	);
}

export default IngredientForm;
