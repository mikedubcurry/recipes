import { useState } from 'react';

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
			// may take args?
			done();
			return;
		}
		setStep(step + 1);
	};
	return (
		<form
			className="bg-slate-400 w-full flex flex-col items-center justify-evenly px-8 py-4"
			// action={action}
			// method={method}
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			{inProgress ? (
				<>
					{children[step]}
					<div className="w-1/2 flex justify-between">
						<button type="button" className="disabled:invisible" disabled={step === 0} onClick={prevForm}>
							prev
						</button>
						{step === children.length - 1 ? (
							<button type="submit" onClick={nextForm}>
								finish
							</button>
						) : (
							<button type="button" onClick={nextForm}>
								next
							</button>
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
