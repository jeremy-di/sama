import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PatientLayout from './PatientLayout';
import CreatePatient from './CreatePatient';
import ListPatient from './ListPatient';
import OnePatient from './OnePatient';
import HomePatient from './HomePatient';
import UpdatePatient from './UpdatePatient';

const PatientRouter = () => {
    return (
        <Routes>
            <Route element={<PatientLayout />}>
                <Route path="/" element={<HomePatient />} />
                <Route path="new" element={<CreatePatient />} />
                <Route path="list" element={<ListPatient />} />
                <Route path="one/:id" element={<OnePatient />} />
                <Route path="update/:id" element={<UpdatePatient />} />
            </Route>
        </Routes>
    );
};

export default PatientRouter;