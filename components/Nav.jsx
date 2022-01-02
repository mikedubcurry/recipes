import Link from "next/link";

function Nav() {
    return (
        <nav className="w-full h-10 flex items-center justify-evenly sticky top-0 bg-slate-300 z-100">
            <Link href="/">
                <span className="cursor-pointer flex items-center transition-all duration-300 bg-gradient-to-r h-full from-slate-300 via-gray-500/30 bg-yellow-500/30 hover:bg-blue-500/30 to-slate-300 px-6 font-semibold text-gray-700 hover:text-white">
                    Home
                </span>
            </Link>
            <Link href="/recipes">
                <span className="cursor-pointer flex items-center transition-all duration-300 bg-gradient-to-r h-full from-slate-300 via-gray-500/30 bg-yellow-500/30 hover:bg-blue-500/30 to-slate-300 px-6 font-semibold text-gray-700 hover:text-white">
                    All Recipes
                </span>
            </Link>
            <Link href="/api/random">
                <span className="cursor-pointer flex items-center transition-all duration-300 bg-gradient-to-r h-full from-slate-300 via-gray-500/30 bg-yellow-500/30 hover:bg-blue-500/30 to-slate-300 px-6 font-semibold text-gray-700 hover:text-white">
                    Random
                </span>
            </Link>
        </nav>
    );
}

export default Nav;
