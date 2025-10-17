import React, { useEffect, useState } from 'react';
import { patientService } from '../../_services/patient.service';
import { useNavigate, useParams } from 'react-router-dom';

const OnePatient = () => {

    const { id } = useParams()
    
    const [ patient, setPatient ] = useState(null)
    const [ loaded, setLoaded ] = useState(false)
    const [ err, setErr ] = useState(null)
    const [ deleting, setDeleting ] = useState(false)

    let navigate = useNavigate()

    useEffect(() => {
        patientService.getOnePatient(id)
            .then(res => {
                console.log(res.data)
                setPatient(res.data)
                setLoaded(true)
            })
            .catch(error => {
                setErr(error)
                setLoaded(true)
            })
    }, [])

    const handledelete = async () => {
        try {
            setDeleting(true)
            await patientService.deletePatient(patient._id)
            navigate("/patient/list")
        } catch (error) {
            setDeleting(false)
            alert(error?.response?.data?.message)
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
                <h1 className='text-4xl text-center mt-5 mb-5 text-sky-800'>Fiche de {patient.firstname} {patient.lastname}</h1>
                {/*  */}
                <div className="w-full p-5 m-auto max-w-5/6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5">
                    <div className="flex flex-col items-center pb-10">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/patient_med.png" alt="Bonnie image"/>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Genre : </span>{patient.gender}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>N° sécurité sociale : </span>{patient.inseeCode}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Adresse : </span>{patient.address}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Code postal : </span>{patient.zipCode}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Ville : </span>{patient.town}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Email : </span>{patient.email || "Aucun"}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>N° de téléphone : </span>{patient.phoneNumber}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Caisse d'assurance maladie : </span>{patient.socialSecurity.name || "Aucun"}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Mutuelle : </span>{patient.healthInsurance.name || "Aucun"}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Médecin traitant : </span>Dr {patient.primaryDoctor.firstname} {patient.primaryDoctor.lastname}</h5>
                        
                    </div>
                </div>
                {/*  */}
                {/*  */}
                <div className="w-full p-5 m-auto max-w-5/6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5">
                    <div className="flex flex-col items-center pb-10">
                        <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white mb-5">Personne de comfiance</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Nom : </span>{patient.tpLastname || "Aucun"}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Prénom : </span>{patient.tpFirstname || "Aucun"}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>N° de téléphone : </span>{patient.tpPhoneNumber || "Aucun"}</h5>
                        <div className="flex mt-4 md:mt-6">
                            <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href={`/patient/update/${patient._id}`}>Modifier les informations</a>
                            <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => { if (window.confirm("Es-tu sûr de vouloir supprimer ce patient ?")) { handledelete(); }}} disabled={deleting}>Supprimer</button>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="w-full p-5 m-auto max-w-5/6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5">
                    <div className="flex flex-col items-center pb-10">
                        <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white mb-5">Documents</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Nom : </span>{patient.tpLastname || "Aucun"}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>Prénom : </span>{patient.tpFirstname || "Aucun"}</h5>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white"><span className='text-sky-800'>N° de téléphone : </span>{patient.tpPhoneNumber || "Aucun"}</h5>
                        <div className="flex mt-4 md:mt-6">
                            <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href={`/secretarydocuments/list/${patient._id}`}>Documents administratifs</a>
                            <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href={`/trainerdocuments/list/${patient._id}`}>Documents médicaux</a>
                            
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>
        );
    }

};

export default OnePatient;