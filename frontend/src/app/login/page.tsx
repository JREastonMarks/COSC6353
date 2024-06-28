export default function Login() {
    return (
        <div className="container mx-auto p-8">
            <div className="mx-auto max-w-sm">
                <div className="bg-white rounded shadow">
                    <form className="bg-grey-lightest px-10 py-10">
                        <div className="border-b py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                            Event Manager Login
                        </div>
                        <div className="mb-3">
                            <input className="border w-full p-3" name="email" type="text" placeholder="E-Mail"></input>
                        </div>
                        <div className="mb-6">
                            <input className="border w-full p-3" name="password" type="password" placeholder="**************"></input>
                        </div>
                        <div className="flex bg-sky-400 text-white">
                            <button className="p-2 w-full">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="border-t px-10 py-6">
                    <div className="flex justify-between">
                        <a href="/register" className="font-bold text-primary hover:text-primary-dark no-underline">Don't have an account?</a>
                        <a href="#" className="text-grey-darkest hover:text-black no-underline">Forgot Password?</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}