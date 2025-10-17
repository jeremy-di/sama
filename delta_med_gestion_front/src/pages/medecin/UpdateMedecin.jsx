import React, { useEffect, useState } from 'react';
import { primaryDoctorService } from '../../_services/primaryDoctor';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMedecin = () => {
    const { id } = useParams()

    const navigate = useNavigate();
  
    const [infos, setInfos] = useState({
    name: ""
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);

    // Récupérer les infos actuelles de l'utilisateur connecté
    useEffect(() => {
    primaryDoctorService.getOneprimaryDoctor(id)
        .then(res => {
        setInfos({
            lastname: res.data.lastname || "",
            firstname: res.data.firstname || "",
            speciality: res.data.speciality || "",
            phoneNumber: res.data.phoneNumber || "",
        });
        setLoading(false);
        })
        .catch(error => {
        console.error(error);
        setErr("Impossible de charger vos informations.");
        setLoading(false);
        });
    }, []);

    const onChange = (e) => {
    setInfos({
        ...infos,
        [e.target.name]: e.target.value
    });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        primaryDoctorService.updateprimaryDoctor(id, {
            lastname: infos.lastname.trim(),
            firstname: infos.firstname.trim(),
            speciality: infos.speciality.trim(),
            phoneNumber: infos.phoneNumber.trim(),
        })
        .then(res => {
            navigate('/medecin/list');
        })
        .catch(error => {
            console.error(error);
            setErr(error.response?.data?.message || "Erreur serveur");
        });
    };

    if (loading) return <p className="text-center">Chargement...</p>;

    return (
    <div>
        <h1 className='text-4xl text-center m-5 text-sky-800'>Modifier une mutuelle</h1>
        <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-sky-800">
        {/* Form */}
        <form className="max-w-md mx-auto" onSubmit={onSubmit}>
            <div className="mb-5">
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nom de famille du médecin</label>
                <input type="text" id="lastname" name="lastname" value={infos.lastname} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Prénom du médecin</label>
                <input type="text" id="firstname" name="firstname" value={infos.firstname} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="speciality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Spécialité</label>
                <input type="text" id="speciality" name="speciality" value={infos.speciality} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">N° de téléphone</label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={infos.phoneNumber} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <div className='text-center'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
            </div>
        </form>
        {/* Form */}
        </div>
        <div className='text-center mt-5'>
            <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/medecin/list">Retour</a>
        </div>
    </div>
    );
};

export default UpdateMedecin;