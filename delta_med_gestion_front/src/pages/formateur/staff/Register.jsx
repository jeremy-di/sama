import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../_services/user.service';

const Register = () => {
    let navigate = useNavigate()

    const [ credentials, setCredentials ] = useState({
        login : "",
        role : "",
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
        userService.register(credentials)
            .then(res => {
                navigate('/')
            })
            .catch(error => {
                console.log(error)
                setErr(error)
            })
    }

    return (
        <div>
            <h1 className='text-4xl text-center m-5 text-sky-800'>Ajouter un utilisateur</h1>
            <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-sky-800">
                {/* Form */}
                <form className="max-w-md mx-auto" onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Login</label>
                    <input type="text" name="login" value={credentials.login} onChange={onChange} id="login" autoComplete="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Role</label>
                    <select id="role" name="role" value={credentials.role} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                        <option key="1">Choisir un rôle</option>
                        <option key="2" value="Etudiant">Etudiant</option>
                        <option key="3" value="Formateur">Formateur</option>
                    </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Mot de passe</label>
                    <input type="password" name="password" value={credentials.password} onChange={onChange} autoComplete="new-password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" " required />
                </div>
                <div className='text-center'>
                    <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/staff/list">Retour</a>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
                </div>
                </form>
                {/* Form */}
            </div>
        </div>
    );
};

export default Register;