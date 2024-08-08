'use client'
import React, {useState, useEfect} from "react"

function ErrorRegistering(props) {
    const errorMessage = props.errorMessage

    if(errorMessage != "") {
        return (<div className="mb-3" style={{color: 'red'}}>
            {errorMessage}
          </div>)
    }

    return null
}

export default function Register() {
    const [email, setEmail] = useState<string>("") 
    const [password, setPassword] = useState<string>("") 
    const [confirmPassword, setConfirmPassword]  = useState<string>("")
    const [role, setRole] = useState<string>("volunteer") 
    const [errorMessage, setErrorMessage] = useState<string>("")

    async function handleSubmit(e) {
        e.preventDefault();

        if (email == "") {
            setErrorMessage("Username must be set")
            return
        }

        if (password.length < 2) {
            setErrorMessage("Invalid password length")
            return
        }

        if (password != confirmPassword) {
            setErrorMessage("Passwords do not match")
            return
        }
        const registerData = new FormData()
        registerData.append("username", email)
        registerData.append("password", password)
        registerData.append("role", role)

        await fetch("/api/user/register", {
            method: "POST",
            body: registerData
        }).then(response => response.text())
        .then((text) => {
            if (text == "success") {
                window.location.replace("/login")
            } else {
                setErrorMessage(text)
            }
        })
    }

    return (
        <div className="container mx-auto p-8">
            <div className="mx-auto max-w-sm">
                <div className="bg-white rounded shadow">
                    <form className="bg-grey-lightest px-10 py-10">
                        <div className="py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                            Register
                        </div>
                        <ErrorRegistering errorMessage={errorMessage}></ErrorRegistering>
                        <div className="mt- grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-8">
                                <div className="mt-2">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">E-Mail</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input id="email" value={email} onChange={e => setEmail(e.target.value)} name="email" type="text" placeholder="E-Mail" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-8">
                                <div className="mt-2">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input id="password" value={password} onChange={e => setPassword(e.target.value)} name="password" type="password" placeholder="*****" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-8">
                                <div className="mt-2">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                                </div>
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} name="confirmPassword" type="password" placeholder="*****" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"></input>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-1">
                                <div className="flex ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input type="radio" checked={role == "admin"} onChange={e => setRole("admin")} id="administrator" name="role" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"></input>
                                    <label htmlFor="administrator" className="block text-sm font-medium leading-6 text-gray-900">Administrator</label>
                                    <input type="radio" checked={role == "volunteer"} onChange={e => setRole("volunteer")} id="volunteer" name="role" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"></input>
                                    <label htmlFor="volunteer" className="block text-sm font-medium leading-6 text-gray-900">Volunteer</label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 bg-sky-400 text-white">
                            <button onClick={handleSubmit}  className="p-2 w-full">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
