import jwt from 'jsonwebtoken';
import { supabase } from './supabaseClient';
import { serialize } from 'cookie';

// You should really not use the fallback and perhaps
// throw an error if this value is not set!
const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || 'super duper secret key';
const cookieOptions = {
	httpOnly: true,
	maxAge: 2592000,
	path: '/',
	sameSite: 'Strict',
	secure: process.env.NODE_ENV === 'production',
};

function setCookie(res, name, value, options = {}) {
	const stringValue = typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

	res.setHeader('Set-Cookie', serialize(name, String(stringValue, options)));
}

// This sets the cookie on a NextApiResponse so we can authenticate
// users on API routes.
export function authenticateUser(res, user) {
	if (!user) return;

	const token = jwt.sign({ email: user.email }, JWT_TOKEN_KEY, {
		expiresIn: '1d',
	});

	setCookie(res, 'auth', token, cookieOptions);
}

// This removes the auth cookie, effectively logging out
// the user.
export function clearUser(res) {
	setCookie(res, 'auth', '0', {
		...cookieOptions,
		path: '/',
		maxAge: 1,
	});
}

// This gives back the user behind a given request
// either on API routes or getServerSideProps
export async function userFromRequest(req) {
	const { auth: token } = req.cookies;

	if (!token) return undefined;

	try {
		const data = jwt.verify(token, JWT_TOKEN_KEY);

		if (!data) return undefined;

		// get user from supabase
		// const user = await prisma.user.findUnique({
		// 	where: { email: data.email },
		// });
		const user = supabase.auth.user();
		console.log(user);
		// let user = {
		// 	email: 'ayo@gmail.com',
		// 	password: 'bingbong',
		// 	id: '123412j124-fee8dfdfa-asfdaf',
		// };
		// clear password
		if (user) user.password = '';

		return user;
	} catch (error) {
		return undefined;
	}
}
