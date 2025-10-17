import React, { useEffect, useState } from 'react';
import { patientService } from '../../_services/patient.service';
import { useNavigate } from 'react-router-dom';
import { socialSecurityService } from '../../_services/socialSecurity.service';
import { healthInsuranceService } from '../../_services/healthInsurance.service';
import { primaryDoctorService } from '../../_services/primaryDoctor';

const CreatePatient = () => {
    let navigate = useNavigate()

    const [ socialSecurities, setSocialSecurities ] = useState(null)
    const [ healthInsurances, setHealthInsurances ] = useState(null)
    const [ primaryDoctors, setPrimaryDoctors ] = useState(null)
    const [ loaded, setLoaded ] = useState(false)
    const [ err1, setErr1 ] = useState(null)

    useEffect(() => {
        Promise.allSettled([
            socialSecurityService.getAllSocialSecuritys(),
            healthInsuranceService.getAllHealthInsurances(),
            primaryDoctorService.getAllprimaryDoctors(),
        ])
        .then(([ss, hi, pd]) => {
            if (ss.status === 'fulfilled') setSocialSecurities(ss.value.data);
            else setErr1(ss.reason);

            if (hi.status === 'fulfilled') setHealthInsurances(hi.value.data);
            else setErr1(hi.reason);

            if (pd.status === 'fulfilled') setPrimaryDoctors(pd.value.data);
            else setErr1(pd.reason);

            setLoaded(true); // ← on marque chargé quand TOUT a répondu
        });
    }, []);

    const [ infos, setInfos ] = useState({
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
        patientService.newPatient(infos)
            .then(res => {
                navigate('/patient/list')
            })
            .catch(error => {
                console.log(error)
                setErr(error)
            })
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
    else if (err1) {
        return (
            <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">Erreur : {err.response.status}</span> {err.response.statusText == "Not Found" && ("Aucune ressources trouvées")}
            </div>
        )
    }
    else {
        return (
            <div>
                <h1 className='text-4xl text-center m-5 text-sky-800'>Créer un dossier patient</h1>
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
                        <input type="email" id="email" name="email" value={infos.email} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
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
                <div className='text-center mt-5'>
                <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/patient">Retour</a>
            </div>
            </div>
        );
    }

};

export default CreatePatient;