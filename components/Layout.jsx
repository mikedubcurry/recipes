import Nav from "./Nav";

function Layout({ children }) {
    return (
        <div className="h-full">
            <Nav />
            <main className="h-full bg-slate-200">{children}</main>
        </div>
    );
}

export default Layout;
