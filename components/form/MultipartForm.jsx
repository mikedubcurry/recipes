import { useState } from 'react';
import ActionButton from '../ActionBtn';

function MultipartForm({ children, done }) {
	const [step, setStep] = useState(0);
	const [inProgress, setInprogress] = useState(true);
	const prevForm = () => {
		if (step === 0) {
			return;
		}
		setStep(step - 1);
	};
	const nextForm = () => {
		if (step === children.length - 1) {
			setInprogress(false);
			done();
			return;
		}
		setStep(step + 1);
	};
	return (
		<form
			className="bg-slate-400 w-full flex flex-col items-center justify-evenly px-8 py-4"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			{inProgress ? (
				<>
					{children[step]}
					<div className="w-1/2 flex justify-between">
						{step !== 0 && <ActionButton btnText="prev" handleClick={prevForm} />}

						{step === children.length - 1 ? (
							<ActionButton btnText="finish" handleClick={nextForm} />
						) : (
							<ActionButton btnText="next" handleClick={nextForm} />
						)}
					</div>
				</>
			) : (
				<p>all done</p>
			)}
		</form>
	);
}

export default MultipartForm;
