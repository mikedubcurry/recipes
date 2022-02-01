import Nav from "./Nav";

function Layout({ children }) {
    return (
        <div className="min-h-screen h-full">
            <Nav />
            <main className="dark:bg-slate-700 min-h-full bg-purple-100">{children}</main>
        </div>
    );
}

export default Layout;
