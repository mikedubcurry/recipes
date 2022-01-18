import { useState } from 'react';
import { v4 as uuid } from 'uuid';

function ProcedureForm({ dispatch, procedure }) {
	const [procText, setProcText] = useState('');
	return (
		<>
			<label htmlFor="proc">
				<p>Step by step, enter the step for the recipe.</p>
				<p>click next when finished</p>
				<input
					type="text"
					id="proc"
					value={procText}
					onChange={(e) => {
						setProcText(e.target.value);
					}}
				/>
			</label>
			<button
				onClick={() => {
					dispatch({ type: 'add_proc', payload: { id: uuid(), txt: procText } });
					setProcText('');
				}}
			>
				Add Step
			</button>
		</>
	);
}

export default ProcedureForm;
