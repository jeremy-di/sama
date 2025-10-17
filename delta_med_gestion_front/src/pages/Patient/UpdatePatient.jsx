import React, { useEffect, useState } from 'react';
import { patientService } from '../../_services/patient.service';
import { useNavigate, useParams } from 'react-router-dom';
import { socialSecurityService } from '../../_services/socialSecurity.service';
import { healthInsuranceService } from '../../_services/healthInsurance.service';
import { primaryDoctorService } from '../../_services/primaryDoctor';

const UpdatePatient = () => {
    const { id } = useParams()

    const navigate = useNavigate();
  
    const [infos, setInfos] = useState({
        gender : "",
        lastname : "",
        firstname : "",
        inseeCode : "",
        address : "",
        zipCode : "",
        town : "",
        email : "",
        phoneNumber : "",
        tpLastname : "",
        tpFirstname : "",
        tpPhoneNumber : "",
        socialSecurity : "",
        healthInsurance : "",
        primaryDoctor : "",
    });
    const [ socialSecurities, setSocialSecurities ] = useState(null)
    const [ healthInsurances, setHealthInsurances ] = useState(null)
    const [ primaryDoctors, setPrimaryDoctors ] = useState(null)
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);

    // Récupérer les infos actuelles de l'utilisateur connecté
    // useEffect(() => {
    //     patientService.getOnePatient(id)
    //         .then(res => {
    //         setInfos({
    //             gender : res.data.gender,
    //             lastname : res.data.lastname,
    //             firstname : res.data.firstname,
    //             inseeCode : res.data.inseeCode,
    //             address : res.data.address,
    //             zipCode : res.data.zipCode,
    //             town : res.data.town,
    //             email : res.data.email,
    //             phoneNumber : res.data.phoneNumber,
    //             tpLastname : res.data.tpLastname,
    //             tpFirstname : res.data.tpFirstname,
    //             tpPhoneNumber : res.data.tpPhoneNumber,
    //             socialSecurity : res.data.socialSecurity,
    //             healthInsurance : res.data.healthInsurance,
    //             primaryDoctor : res.data.primaryDoctor,
    //         });
    //         setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setErr("Impossible de charger vos informations.");
    //             setLoading(false);
    //         });
    // }, []);

    useEffect(() => {
            Promise.allSettled([
                patientService.getOnePatient(id),
                socialSecurityService.getAllSocialSecuritys([]),
                healthInsuranceService.getAllHealthInsurances([]),
                primaryDoctorService.getAllprimaryDoctors([]),
            ])
            .then(([ps, ss, hi, pd]) => {
                if (ps.status === 'fulfilled')  setInfos({
                    gender : ps.value.data.gender,
                    lastname : ps.value.data.lastname,
                    firstname : ps.value.data.firstname,
                    inseeCode : ps.value.data.inseeCode,
                    address : ps.value.data.address,
                    zipCode : ps.value.data.zipCode,
                    town : ps.value.data.town,
                    email : ps.value.data.email,
                    phoneNumber : ps.value.data.phoneNumber,
                    tpLastname : ps.value.data.tpLastname,
                    tpFirstname : ps.value.data.tpFirstname,
                    tpPhoneNumber : ps.value.data.tpPhoneNumber,
                    socialSecurity : ps.value.data.socialSecurity?._id,
                    healthInsurance : ps.value.data.healthInsurance?._id,
                    primaryDoctor : ps.value.data.primaryDoctor?._id,
                });
                else setErr1(ss.reason);
                
                if (ss.status === 'fulfilled') setSocialSecurities(ss.value.data);
                else setErr1(ss.reason);
    
                if (hi.status === 'fulfilled') setHealthInsurances(hi.value.data);
                else setErr1(hi.reason);
    
                if (pd.status === 'fulfilled') setPrimaryDoctors(pd.value.data);
                else setErr1(pd.reason);
    
                setLoading(false); // ← on marque chargé quand TOUT a répondu
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
        patientService.updatePatient(id, {
            name: infos.name,
            gender : infos.gender,
            lastname : infos.lastname,
            firstname : infos.firstname,
            inseeCode : infos.inseeCode,
            address : infos.address,
            zipCode : infos.zipCode,
            town : infos.town,
            email : infos.email,
            phoneNumber : infos.phoneNumber,
            tpLastname : infos.tpLastname,
            tpFirstname : infos.tpFirstname,
            tpPhoneNumber : infos.tpPhoneNumber,
            socialSecurity : infos.socialSecurity,
            healthInsurance : infos.healthInsurance,
            primaryDoctor : infos.primaryDoctor
        })
        .then(res => {
            navigate('/patient/list');
        })
        .catch(error => {
            console.error(error);
            setErr(error.response?.data?.message || "Erreur serveur");
        });
    };

    if (loading) return <p className="text-center">Chargement...</p>;

    return (
    <div>
        <h1 className='text-4xl text-center m-5 text-sky-800'>Modifier une caisse primaire</h1>
        <div className="border sm:w-full lg:w-1/2 m-auto mt-5 p-5 rounded border-sky-800">
        {/* Form */}
        <form className="max-w-md mx-auto" onSubmit={onSubmit}>
            <div className="mb-5">
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Genre</label>
                <select id="gender" name="gender" value={infos.gender} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                    <option key="1">Choisir un genre</option>
                    <option key="2" value="Masculin">Masculin</option>
                    <option key="3" value="Feminin">Feminin</option>
                    <option key="4" value="Autre">Autre</option>
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nom de famille</label>
                <input type="text" id="lastname" name="lastname" value={infos.lastname} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Prénom</label>
                <input type="text" id="firstname" name="firstname" value={infos.firstname} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="inseeCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">N° INSEE + clé</label>
                <input type="number" id="inseeCode" name="inseeCode" value={infos.inseeCode} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" required />
            </div>
            <div className="mb-5">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Adresse postale</label>
                <textarea id="address" name="address" value={infos.address} onChange={onChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"></textarea>
            </div>
            <div className="mb-5">
                <label htmlFor="zipCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Code postal</label>
                <input type="text" id="zipCode" name="zipCode" value={infos.zipCode} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="town" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Ville</label>
                <input type="text" id="town" name="town" value={infos.town} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Email</label>
                <input type="email" id="email" name="email" value={infos.email} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">N° de téléphone</label>
                <input type="text" id="phoneNumber" name="phoneNumber" value={infos.phoneNumber} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            
            <div className="mb-5">
                <label htmlFor="tpLastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Nom de famille de la personne de comfiance</label>
                <input type="text" id="tpLastname" name="tpLastname" value={infos.tpLastname} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className="mb-5">
                <label htmlFor="tpFirstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Prénom de la personne de comfiance</label>
                <input type="text" id="tpFirstname" name="tpFirstname" value={infos.tpFirstname} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className="mb-5">
                <label htmlFor="tpPhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">N° de téléphone de la personne de comfiance</label>
                <input type="text" id="tpPhoneNumber" name="tpPhoneNumber" value={infos.tpPhoneNumber} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>

            <div className="mb-5">
                <label htmlFor="socialSecurity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Caisse d'assurance maladie</label>
                <select id="socialSecurity" name="socialSecurity" value={infos.socialSecurity} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                    <option key="1">Choisir une caisse</option>
                    {socialSecurities.map(socialSecurity => (
                    <option key={socialSecurity._id} value={socialSecurity._id}>{socialSecurity.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="healthInsurance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Caisse d'assurance maladie</label>
                <select id="healthInsurance" name="healthInsurance" value={infos.healthInsurance} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                    <option key="1">Choisir une mutuelle</option>
                    {healthInsurances.map(healthInsurance => (
                    <option key={healthInsurance._id} value={healthInsurance._id}>{healthInsurance.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="primaryDoctor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Médecin</label>
                <select id="primaryDoctor" name="primaryDoctor" value={infos.primaryDoctor} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                    <option key="1">Choisir un médecin</option>
                    {primaryDoctors.map(primaryDoctor => (
                    <option key={primaryDoctor._id} value={primaryDoctor._id}>{primaryDoctor.lastname} {primaryDoctor.firstname}</option>
                    ))}
                </select>
            </div>

            <div className='text-center'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Valider</button>
            </div>
        </form>
        {/* Form */}
        </div>
    </div>
    );
};

export default UpdatePatient;