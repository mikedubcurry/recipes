import { useState } from 'react';

function MultipartForm({ children, onComplete }) {
	const [step, setStep] = useState(0);
	const [inProgress, setInprogress] = useState(true);
	const nextForm = () => {
		if (step === children.length - 1) {
			setInprogress(false);
			// may take args?
			onComplete();
			return;
		}
		setStep(step + 1);
	};
	return (
		<>
			{inProgress ? (
				<>
					{children[step]} <button onClick={nextForm}>next</button>
				</>
			) : (
				<p>all done</p>
			)}
		</>
	);
}

export default MultipartForm;
