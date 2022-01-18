import { useState } from 'react';

function EditProcedure({ proc, dispatch }) {
	const [editting, setEditting] = useState(false);
	const [procText, setProcText] = useState(proc.txt);

	const cancelEdit = () => {
		setEditting(false);
		setProcText(proc.txt);
	};
	console.log(editting);
	return (
		<li className="w-full flex mb-4 justify-between list-style-none bg-yellow-200 py-2 px-4 rounded-xl">
			<span className="grid grid-cols-2 grid-rows-2">
				{editting ? (
					<input type="text" value={procText} onChange={(e) => setProcText(e.target.value)} />
				) : (
					<span className="grid grid-cols-2 grid-rows-2">
						<span className="col-start-1">
							<p>{proc.txt}</p>
						</span>
						<span className="flex flex-col h-full justify-between">
							<button
								className="self-end transition-all  h-8 w-8 rotate-0 hover:rotate-90 px-2 py-1 "
								onClick={() => dispatch({ type: 'remove_proc', payload: { id: proc.id } })}
							>
								X
							</button>
						</span>
					</span>
				)}
				<span className="flex gap-2">
					{editting ? (
						<>
							<button onClick={cancelEdit}>Cancel</button>
							<button
								onClick={() => {
									dispatch({ type: 'edit_proc', payload: { id: proc.id, txt: procText } });
									setEditting(false);
								}}
							>
								Edit
							</button>
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

export default EditProcedure;
