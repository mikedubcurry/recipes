import Auth from './Auth';
import Nav from './Nav';

function Layout({ children }) {
	return (
		<>
			<Nav />
			<main className="h-screen bg-slate-200">{children}</main>
		</>
	);
}

export default Layout;
