export default function Register() {
    return (
        <div className="flex flex-col items-center justify-center p-24">
            <h1 className="font-bold text-4xl mb-8">Register</h1>
            <div className="mb-4">
                <div className="flex flex-row">
                <div className="mr-4">
                    <label htmlFor="administrator">Role: </label>
                </div>
                <div className="mr-4 mb-4">
                        <input type="radio" id="administrator" name="role" value="administrator" className="mr-2" required></input>
                        <label htmlFor="administrator">Administrator</label>
                </div>
                <div>
                        <input type="radio" id="volunteer" name="role" value="volunteer" className="mr-2" required></input>
                        <label htmlFor="volunteer">Volunteer</label>
                </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" name="email" placeholder="Enter your email" minLength="11" maxLength="40" required></input>
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" name="password" placeholder="Enter your password" minLength="6" maxLength="20" required></input>
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Confirm Password: </label>
                    <input type="text" id="password" name="password" placeholder="Confirm your password" minLength="6" maxLength="20" required></input>
                </div>
            </div>
            <button type="submit" className="bg-black text-white py-2 px-4 rounded">Submit</button>
        </div>
    );
}
