import Link from 'next/link';

function Nav() {
	return (
		<nav className="w-full h-10 flex items-center justify-evenly sticky top-0 bg-slate-300 z-100">
			<Link passHref href="/">
				<a className="h-full">
					<span className="w-full justify-center cursor-pointer flex items-center transition-all duration-700 bg-gradient-to-r h-full from-slate-300 via-gray-500/30 bg-yellow-500/30 hover:bg-blue-500/30 to-slate-300 px-6 font-semibold text-gray-700 hover:text-white">
						Home
					</span>
				</a>
			</Link>
			<Link passHref href="/api/random">
				<a className="h-full">
					<span className="w-full justify-center cursor-pointer flex items-center transition-all duration-700 bg-gradient-to-r h-full from-slate-300 via-gray-500/30 bg-yellow-500/30 hover:bg-blue-500/30 to-slate-300 px-6 font-semibold text-gray-700 hover:text-white">
						Random
					</span>
				</a>
			</Link>
			<Link passHref href="/new">
				<a className="h-full">
					<span className="w-full justify-center cursor-pointer flex items-center transition-all duration-700 bg-gradient-to-r h-full from-slate-300 via-gray-500/30 bg-yellow-500/30 hover:bg-blue-500/30 to-slate-300 px-6 font-semibold text-gray-700 hover:text-white">
						New
					</span>
				</a>
			</Link>
		</nav>
	);
}

export default Nav;
