import Link from 'next/link';

function Nav() {
	return (
		<nav>
			<Link href="/">Home</Link>
			<Link href="/recipes">All Recipes</Link>
			<Link href="/api/random">Random</Link>
		</nav>
	);
}

export default Nav;
