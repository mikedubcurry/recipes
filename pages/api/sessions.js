import { logIn } from '../../utils/auth';
import { authenticateUser, clearUser } from '../../utils/token';
import defaultHandler from './_defaultHandler';

const handler = defaultHandler()
	.post(async (req, res) => {
		const { user, error } = await logIn(JSON.parse(req.body));
		console.log({ user, error });

		if (user) {
			authenticateUser(res, user);
			res.json({ user });
		} else {
			res.status(404).json({ error: 'invalid credentials' });
		}
	})
	.delete((_req, res) => {
		clearUser(res);
		res.send('');
	});

export default handler;
