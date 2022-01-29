import { userFromRequest } from '../../utils/token';
import Auth from '../../components/auth/Auth';


function AccountPage({ user }) {
	console.log(user);

	return (
		<section>
			<Auth />
		</section>
	);
}

export async function getServerSideProps(context) {
	const user = await userFromRequest(context.req);
	if (!user) return { props: {} };
	return {
		props: { user },
	};
}

export default AccountPage;
