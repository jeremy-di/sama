import React from 'react';

const HomeMedecin = () => {
    return (
        <div>
            <h1 className='text-4xl text-center mt-5 mb-5 text-sky-800'>Médecins</h1>
            <div className='text-center mt-5'>
                <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/">Retour</a>
            </div>

            <div className='h-screen sm:block w-1/2 m-auto lg:flex items-center justify-center gap-5'>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5">
                    <a href="/medecin/new">
                        <img className="rounded-t-lg" src="/images/plus.png" alt="" />

                        <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ajouter</h5>
                        </div>
                    </a>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5">
                    <a href="/medecin/list">
                        <img className="rounded-t-lg" src="/images/list.png" alt="" />
                        <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Liste</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HomeMedecin;