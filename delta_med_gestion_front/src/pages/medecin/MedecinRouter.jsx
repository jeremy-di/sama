import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MedecinLayout from './MedecinLayout';
import HomeMedecin from './HomeMedecin';
import CreateMedecin from './CreateMedecin';
import UpdateMedecin from './UpdateMedecin';
import ListMedecin from './ListMedecin';
import OneMedecin from './OneMedecin';

const MedecinRouter = () => {
    return (
        <Routes>
            <Route element={<MedecinLayout />}>
                <Route path="/" element={<HomeMedecin />} />
                <Route path="new" element={<CreateMedecin />} />
                <Route path="list" element={<ListMedecin />} />
                <Route path="one/:id" element={<OneMedecin />} />
                <Route path="update/:id" element={<UpdateMedecin />} />
            </Route>
        </Routes>
    );
};

export default MedecinRouter;