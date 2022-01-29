import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ActionBtn from '../ActionBtn';

function Auth({}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const onSubmit = async (params) => {
		// console.log(params);

		const response = await fetch('/api/sessions', {
			method: 'post',
			body: JSON.stringify(params),
		});
		const { user, error } = await response.json();
		// console.log({ user, error });
	};

	// const handleSignUp = async () => {
	// 	const response = await fetch('/api/sessions', {
	// 		method: 'post',
	// 		body: JSON.stringify({ email, password }),
	// 	});
	// 	const { user, error } = await response.json();
	// 	console.log({ user, error });
	// };

	return (
		<form className="h-screen u-center flex flex-col items-center space-y-8" onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor="email">
				<span>Email</span>
			</label>
			<input type="text" id="email" type="email" {...register('email', { required: true })} />
			<label htmlFor="password">
				<span>Password</span>
			</label>
			<input type="password" id="password" {...register('password', { required: true })} />
			<div>
				{/* <ActionBtn type="sumbit" btnText="Log In" /> */}
				<input type="submit" value="Log In" />
				{/* <ActionBtn type="button" btnText="Sign Up" handleClick={handleSignUp} /> */}
				{/* <button type='button'>Log In</button>
				<button type='button'>Sign Up</button> */}
			</div>
		</form>
	);
}

export default Auth;
