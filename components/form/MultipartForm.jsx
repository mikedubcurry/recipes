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
		<>
			{inProgress ? (
				<>
					{children[step]}
					<div className="w-1/2 flex justify-between">
						<button className="disabled:invisible" disabled={step === 0} onClick={prevForm}>
							prev
						</button>
						<button onClick={nextForm}>next</button>
					</div>
				</>
			) : (
				<p>all done</p>
			)}
		</>
	);
}

export default MultipartForm;
