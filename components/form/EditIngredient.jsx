import { useState } from 'react';

function EditIngredient({ ing, dispatch }) {
	// const { ingredient, unit, amount } = ing;
	const [editting, setEditting] = useState(false);
	const [ingredient, setIngredient] = useState(ing.ingredient);
	const [amount, setAmount] = useState(ing.amount);
	const [unit, setUnit] = useState(ing.unit);

	const removeIngredient = () => {
		dispatch({ type: 'remove_ingredient', payload: ing });
	};

	const cancelEdit = () => {
		setIngredient(ing.ingredient);
		setAmount(ing.amount);
		setUnit(ing.unit);
		setEditting(false);
	};

	const editIngredient = () => {
		dispatch({
			type: 'edit_ingredient',
			payload: { ingredient, unit: parseInt(amount) !== 1 && unit[unit.length - 1] !== 's' ? unit + 's' : unit, amount, id: ing.id },
		});
    setEditting(false)
	};
	return (
		<li className="w-full flex mb-4 justify-between list-style-none bg-yellow-200 py-2 px-4 rounded-xl">
			<span className="grid grid-cols-2 grid-rows-2">
				{editting ? (
					<>
						<input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
						<input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
						<input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
					</>
				) : (
					<>
						<header className="font-bold">{ingredient}</header>
						<span className="col-start-1">{amount}</span>
						<span className="col-start-2 row-start-2">{unit}</span>
					</>
				)}
			</span>
			<span className="flex flex-col h-full justify-between">
				<button
					className="self-end transition-all  h-8 w-8 rotate-0 hover:rotate-90 px-2 py-1 "
					onClick={removeIngredient}
				>
					X
				</button>
				<span className="flex gap-2">
					{editting ? (
						<>
							<button onClick={cancelEdit}>Cancel</button>
							<button onClick={editIngredient}>Edit</button>
						</>
					) : (
						<>
							<button onClick={() => setEditting(true)}>Edit</button>
						</>
					)}
				</span>
			</span>
		</li>
	);
}

export default EditIngredient;
