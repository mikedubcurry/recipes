import nextConnect from 'next-connect';

export default function defaultHandler() {
	return nextConnect({
		attachParams: true,
		onError: (err, req, res) => {
			console.error(err);

			res.status(500).json({ error: 'Internal Server Error' });
		},
	});
}
