'use client'
import React, { useState, useEffect} from "react";

export default function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    async function handleSubmit(e) {
        e.preventDefault();
        const loginData = new FormData()
        loginData.append("username", email)
        loginData.append("password", password)

        await fetch("/api/login", {
            method: "POST",
            body: loginData
        }).then(response => {
            if (response.redirected) {
              window.location.replace(response.url); 
              return;
            }
          })
    }

    return (
        <div className="container mx-auto p-8">
            <div className="mx-auto max-w-sm">
                <div className="bg-white rounded shadow">
                    <form className="bg-grey-lightest px-10 py-10">
                        <div className="border-b py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                            Event Manager Login
                        </div>
                        <div className="mb-3">
                            <input className="border w-full p-3" name="email" type="text" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className="mb-6">
                            <input className="border w-full p-3" name="password" type="password" placeholder="**************" value={password} onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <div className="flex bg-sky-400 text-white">
                            <button onClick={handleSubmit} className="p-2 w-full">
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