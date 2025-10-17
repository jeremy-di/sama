import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FormateurLayout from './FormateurLayout';
import FormateurMenu from './FormateurMenu';
import FormateurListPatient from './formateurPatient/FormateurListPatient';
import FormateurOnePatient from './formateurPatient/FormateurOnePatient';
import FormateurListCP from './formateurCP/FormateurListCP';
import FormateurListMutuelle from './formateurMutuelle/FormateurListMutuelle';
import FormateurListMedecin from './formateurMedecin/FormateurListMedecin';
import FormateurOneMedecin from './formateurMedecin/FormateurOneMedecin';

const FormateurRouter = () => {
    return (
        <Routes>
            <Route element={<FormateurLayout />}>
                <Route path="menu" element={<FormateurMenu />} />
                <Route path="listpatients" element={<FormateurListPatient />} />
                <Route path="onepatient/:id" element={<FormateurOnePatient />} />
                <Route path="listcaisses" element={<FormateurListCP />} />
                <Route path="listmutuelles" element={<FormateurListMutuelle />} />
                <Route path="listmedecins" element={<FormateurListMedecin />} />
                <Route path="onemedecin/:id" element={<FormateurOneMedecin />} />
            </Route>
        </Routes>
    );
};

export default FormateurRouter;