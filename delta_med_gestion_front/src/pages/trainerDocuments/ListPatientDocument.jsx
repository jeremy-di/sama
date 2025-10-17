import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { secretaryFileService } from '../../_services/secretaryFileService';
import { trainerFileService } from '../../_services/trainerFile.service';

const ListPatientDocument = () => {

    const { id } = useParams()

    const [ documents, setDocuments ] = useState(null)
    const [ loaded, setLoaded ] = useState(false)
    const [ err, setErr ] = useState(null)

    useEffect(() => {
        trainerFileService.getTrainerFilesByPatientId(id)
            .then(res => {
                console.log(res.data)
                setDocuments(res.data)
                setLoaded(true)
            })
            .catch(error => {
                if (error?.response?.status === 404) {
                    setDocuments([]);
                    setErr(null);
                    } else {
                    setErr(error);
                    }
                    setLoaded(true);
                })
    }, [])

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
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">Erreur : {err.response.status}</span> {err.response.statusText == "Not Found" && ("Aucune ressources trouvées")}
            </div>
        )
    }
    else if (documents.length === 0) {
        return (
            <div>
                <h1 className='text-4xl text-center mt-5 mb-5 text-sky-800'>Liste des documents administratifs</h1>    
                <div className="relative overflow-x-auto hidden md:block">
                    <h2>Pas de documents</h2>
                </div>
                <div className='text-center mt-5'>
                    <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/patient/list">Retour</a>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1 className='text-4xl text-center mt-5 mb-5 text-sky-800'>Liste des documents médicaux</h1>
                <div className="space-y-3 md:hidden">
                    {documents.map((document, index) => (
                    <div key={index} className="rounded-lg border p-4 bg-white dark:bg-gray-800">
                        <div className="flex justify-between">
                        <div className="font-semibold text-gray-900 dark:text-white">{document.designation}</div>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">{document.patient.lastname} {document.patient.firstname}</div>
    
                        <div className="mt-3 flex flex-wrap gap-2">
                        <a href={`/secretarydocuments/one/${document._id}`} className="inline-flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Voir</a>
                        </div>
                    </div>
                    ))}
                </div>
    
                <div className="relative overflow-x-auto hidden md:block">
                <table className="min-w-full text-sm text-left rtl:text-right text-gray-700">
                    <thead className="text-xs uppercase text-gray-white">
                    <tr>
                        <th className="px-6 py-3">Designation</th>
                        <th className="px-6 py-3">Patient</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents.map((document, index) => (
                    <tr key={index} className="bg-white dark:bg-gray-800">
                        <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">{document.designation}</th>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{document.patient.lastname} {document.patient.firstname}</td>
                        <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                            <a href={`/trainerdocuments/one/${document._id}`} className="inline-flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs sm:text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Voir</a>
                        </div>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <div className='text-center mt-5'>
                    <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/trainerdocuments">Retour</a>
                </div>
            </div>
        );
    }
};

export default ListPatientDocument;