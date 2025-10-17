import React from 'react';

const HomeDocument = () => {
    return (
        <div>
            <h1 className='text-4xl text-center mt-5 mb-5 text-sky-800'>Documents administratifs</h1>
            <div className='text-center mb-5'>
                <a className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900' href="/">Retour</a>
            </div>

            <div className='h-screen sm:block w-1/2 m-auto lg:flex items-center justify-center gap-5'>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5">
                    <a href="/secretarydocuments/new">
                        <img class="rounded-t-lg" src="/images/plus.png" alt="" />

                        <div class="p-5">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ajouter</h5>
                        </div>
                    </a>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5">
                    <a href="/secretarydocuments/listcomplete">
                        <img class="rounded-t-lg" src="/images/list.png" alt="" />
                        <div class="p-5">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Documents administratifs</h5>
                        </div>
                    </a>
                </div>
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-5">
                    <a href="/trainerdocuments/listcomplete">
                        <img class="rounded-t-lg" src="/images/list.png" alt="" />
                        <div class="p-5">
                                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Documents médicaux</h5>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HomeDocument;