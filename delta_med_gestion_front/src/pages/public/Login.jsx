import React, { useState } from 'react';
import { userService } from '../../_services/user.service';

const Login = () => {
    const [ credentials, setCredentials ] = useState({
        login : "",
        password : ""
    })

    const [ err, setErr ] = useState(null)

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [ e.target.name ] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        userService.login(credentials)
            .then(res => {
                console.log(res.data)
                userService.saveToken(res.data.token)
                userService.saveRole(res.data.role)
                window.location.href = "/"
            })
            .catch(error => {
                console.log(error)
                setErr(error.response?.data?.message)
            })
    }

    return (
        <div>
            <h1 className='text-4xl text-center m-5 text-sky-800'>Se connecter</h1>
            <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-sky-800">
                {/* Form */}
                <form className="max-w-md mx-auto" onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="login" value={credentials.login} onChange={onChange} id="login" className="block py-2.5 px-0 w-full text-sm text-gray-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="login" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Login</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="password" value={credentials.password} onChange={onChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mot de passe</label>
                </div>
                <div className='text-center'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
                </div>
                {err && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-5" role="alert">
                    <span className="font-medium">{err}</span>
                </div>
                )}
                </form> 
                {/* Form */}
            </div>
        </div>
    );
};

export default Login;