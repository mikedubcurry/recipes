import Link from 'next/link';

function Nav() {
	return (
		<nav className="bg-green-400 flex justify-evenly items-center h-10">
			<span className="transition-all hover:scale-110 hover:text-slate-800">
				<Link href="/">Home</Link>
			</span>
			<span className="transition-all hover:scale-110 hover:text-slate-800">
				<Link href="/recipes">All Recipes</Link>
			</span>
			<span className="transition-all hover:scale-110 hover:text-slate-800">
				<Link href="/api/random">Random</Link>
			</span>
		</nav>
	);
}

export default Nav;
