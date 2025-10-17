import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../_services/user.service';

const UpdatePassword = () => {

    const navigate = useNavigate()

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [err, setErr] = useState(null);
    const [ message, setMessage ] = useState("")

    const onChange = (e) => {
        setPassword({
        ...password,
        [e.target.name]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        userService.updateMyPassword(password)
        .then(res => {
            console.log(res.data);
            setMessage(res.data.message)
        })
        .catch(error => {
            console.error(error);
            setErr(error.response?.data?.message || "Erreur serveur");
        });
    };

    return (
        <div>
         {message && (   
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">{message || ""}</span> <a className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' href="/staff/myprofil">Retour</a>
        </div>
        )}
        <h1 className='text-4xl text-center m-5 text-sky-800'>Modifier mon mot de passe</h1>
        <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-sky-800">
            {/* Form */}
            <form className="max-w-md mx-auto" onSubmit={onSubmit}>

            <div className="mb-5">
                <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Ancien mot de passe</label>
                <input type="oldPassword" id="oldPassword" name="oldPassword" value={password.oldPassword} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nouveau mot de passe</label>
                <input type="newPassword" id="newPassword" name="newPassword" value={password.newPassword} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Confirmation du nouveau mot de passe</label>
                <input type="confirmPassword" id="confirmPassword" name="confirmPassword" value={password.confirmPassword} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            {err && <p className="text-red-500 mb-3">{err}</p>}
            <div className='text-center'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg">
                Modifier
                </button>
            </div>
            </form>
            {/* Form */}
            <div className='text-center mt-5'>
                <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/staff/myprofil">Retour</a>
            </div>
        </div>
        </div>
    );
};

export default UpdatePassword;