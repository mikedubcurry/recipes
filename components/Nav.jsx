import Link from 'next/link';

function Nav() {
	return (
		<nav className="w-full h-10 flex items-center justify-evenly sticky top-0 bg-slate-300 z-50">
			<Link passHref href="/">
				<a className="h-full transition underline underline-offset-4 decoration-1 decoration-slate-400 hover:decoration-slate-300 focus:decoration-slate-300">
					<span className="w-full justify-center cursor-pointer flex items-center h-full px-6 font-semibold text-gray-700 ">
						Home
					</span>
				</a>
			</Link>
			<Link passHref href="/api/random">
				<a className="h-full transition underline underline-offset-4 decoration-1 decoration-slate-400 hover:decoration-slate-300 focus:decoration-slate-300">
					<span className="w-full justify-center cursor-pointer flex items-center h-full px-6 font-semibold text-gray-700 ">
						Random
					</span>
				</a>
			</Link>
			<Link passHref href="/new">
				<a className="h-full transition underline underline-offset-4 decoration-1 decoration-slate-400 hover:decoration-slate-300 focus:decoration-slate-300">
					<span className="w-full justify-center cursor-pointer flex items-center h-full px-6 font-semibold text-gray-700 ">
						New
					</span>
				</a>
			</Link>
		</nav>
	);
}

export default Nav;
