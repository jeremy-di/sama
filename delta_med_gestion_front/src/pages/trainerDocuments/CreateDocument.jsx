import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { secretaryFileService } from '../../_services/secretaryFileService';
import { patientService } from '../../_services/patient.service';
import { trainerFileService } from '../../_services/trainerFile.service';

const CreateDocument = () => {
    let navigate = useNavigate()

    const [ patients, setPatients ] = useState(null)
    const [ loaded, setLoaded ] = useState(false)
    const [ err, setErr ] = useState(null)

    useEffect(() => {
        patientService.getAllPatients()
            .then(res => {
                console.log(res.data)
                setPatients(res.data)
                setLoaded(true)
            })
            .catch(error => {
                console.log(error)
                setErr(error)
                setLoaded(true)
            })
    }, [])

    const [ designation, setDesignation ] = useState()
    const [ name, setName ] = useState()
    const [ patient, setPatient ] = useState()

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("designation", designation)
        formData.append('name', name)
        formData.append("patient", patient)


        const config = {headers: {'Content-Type' : 'multipart/form-data'}}

        try {
            const data = await trainerFileService.newTrainerFile( formData, config )
            navigate('/')
            console.log(data)
        } catch (error) {
            console.log(error)            
        }
    }

    if ( !loaded ) {
        return (
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
    else if (err) {
        return (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Erreur : {err.response.status}</span> {err.response.statusText == "Not Found" && ("Aucune ressources trouvées")}
            </div>
        )
    }
    else {
        return (
            <div>
                <h1 className='text-4xl text-center m-5 text-sky-800'>Ajout d'un document</h1>
                <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-sky-800">
                    {/* Form */}
                    <form className="max-w-md mx-auto"encType={'multipart/form'} onSubmit={onSubmit}>
                    
                    <div className="mb-5">
                        <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Médecin</label>
                        <select id="designation" name="designation" onChange={(e) => {setDesignation(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    
                            <option key="1">Choisir un type</option>
                            <option key="2" value="Ordonnance">Ordonnance</option>
                            <option key="3" value="Résultats biologie">Résultats biologie</option>
                            <option key="4" value="Compte-rendus">Compte-rendus</option>
                            <option key="5" value="Courrier spécialiste">Courrier spécialiste</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Upload file</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="name" name="name" onChange={(e) => {setName(e.target.files[0])}} type="file"/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="patient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Médecin</label>
                        <select id="patient" name="patient" onChange={(e) => {setPatient(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    
                            <option key="1">Choisir un patient</option>
                            {patients.map(patient => (
                            <option key={patient._id} value={patient._id}>{patient.lastname} {patient.firstname}</option>
                            ))}
                        </select>
                    </div>
    
                    <div className='text-center'>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
                    </div>
                    </form>
                    {/* Form */}
                </div>
                <div className='text-center mt-5'>
                    <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/trainerdocuments">Retour</a>
                </div>
            </div>
        );
    }

};

export default CreateDocument;