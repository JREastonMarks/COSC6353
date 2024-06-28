export default function Header() {
    return (
        <header className="bg-white rounded-lg border shadow-lg">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/">Event Manager</a>
                </div>
                <div className="flex lg:gap-x-12">
                    <a href="/login">Log In</a>
                </div>
            </nav>
        </header>
    );
}