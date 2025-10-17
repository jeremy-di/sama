import React, { useState } from 'react';
import { socialSecurityService } from '../../_services/socialSecurity.service';
import { useNavigate } from 'react-router-dom';

const CreateCP = () => {
    let navigate = useNavigate()

    const [ infos, setInfos ] = useState({
        name : ""
    })

    const [ err, setErr ] = useState(null)

    const onChange = (e) => {
        setInfos({
            ...infos,
            [ e.target.name ] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        socialSecurityService.newSocialSecurity(infos)
            .then(res => {
                navigate('/caisseprimaire/list')
            })
            .catch(error => {
                console.log(error)
                setErr(error)
            })
    }
    return (
        <div>
            <h1 className='text-4xl text-center m-5 text-sky-800'>Ajout d'une caisse primaire</h1>
            <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-sky-800">
                {/* Form */}
                <form className="max-w-md mx-auto" onSubmit={onSubmit}>
                
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nom de la caisse primaire</label>
                    <input type="text" id="name" name="name" value={infos.name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div className='text-center'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
                </div>
                </form>
                {/* Form */}
            </div>
            <div className='text-center mt-5'>
                <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/caisseprimaire">Retour</a>
            </div>
        </div>
    );
};

export default CreateCP;