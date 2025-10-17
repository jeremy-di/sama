import React from 'react';
import { userService } from '../../_services/user.service';

const Home = () => {
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Tableau de bord</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Créer un dossier patient ou ajouter une assurance maldie ou une mutuelle complémentaire</p>
                </div> 
                <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {userService.isLogged() && (
                    <>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <a href="/patient">
                        <img className="mx-auto mb-4 w-36 h-36 rounded-full" src="/images/patient.png" alt="Bonnie Avatar"/>
                        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Dossiers patients
                        </h3>
                        </a>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <a href="#">
                        <img className="mx-auto mb-4 w-36 h-36 rounded-full" src="/images/rdv.png" alt="Bonnie Avatar"/>
                        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Rendez-vous
                        </h3>
                        </a>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <a href="/secretarydocuments">
                        <img className="mx-auto mb-4 w-36 h-36 rounded-full" src="/images/documents.png" alt="Bonnie Avatar"/>
                        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Documents patients
                        </h3>
                        </a>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <a href="/caisseprimaire">
                        <img className="mx-auto mb-4 w-36 h-36 rounded-full" src="/images/cpam.png" alt="Bonnie Avatar"/>
                        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Caisse d'assurance maladie
                        </h3>
                        </a>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <a href="/mutuelle">
                        <img className="mx-auto mb-4 w-36 h-36 rounded-full" src="/images/mutuelle.png" alt="Bonnie Avatar"/>
                        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Mutuelles
                        </h3>
                        </a>
                    </div>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <a href="/medecin">
                        <img className="mx-auto mb-4 w-36 h-36 rounded-full" src="/images/medecin.png" alt="Bonnie Avatar"/>
                        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Médecins
                        </h3>
                        </a>
                    </div>
                    </>
                    )}
                    {!userService.isLogged() && (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <a href="/login">
                        <img className="mx-auto mb-4 w-36 h-36 rounded-full" src="/images/login.png" alt="Bonnie Avatar"/>
                        <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Se connecter
                        </h3>
                        </a>
                    </div>
                    )}
                </div>  
            </div>
            </section>
        </div>
        
    );
};

export default Home;