import { useState } from 'react';

import ActionBtn from '../ActionBtn';
import { supabase } from '../../utils/supabaseClient';

function Auth({}) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		const response = await fetch('/api/sessions', {
			method: 'post',
			body: JSON.stringify({ email, password }),
		});
		const { user, error } = await response.json();
		console.log({ user, error });
	};

	const handleSignUp = async () => {
		const response = await fetch('/api/sessions', {
			method: 'post',
			body: JSON.stringify({ email, password }),
		});
		const { user, error } = await response.json();
		// const { user, error } = await supabase.auth.signUp({
		// 	email,
		// 	password,
		// });
		console.log({ user, error });
	};

	return (
		<form>
			<label htmlFor="email">
				<span>Email</span>
			</label>
			<input type="text" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<label htmlFor="password">
				<span>Password</span>
			</label>
			<input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<div>
				<ActionBtn type="button" btnText="Log In" handleClick={handleLogin} />
				<ActionBtn type="button" btnText="Sign Up" handleClick={handleSignUp} />
				{/* <button type='button'>Log In</button>
				<button type='button'>Sign Up</button> */}
			</div>
		</form>
	);
}

export default Auth;
