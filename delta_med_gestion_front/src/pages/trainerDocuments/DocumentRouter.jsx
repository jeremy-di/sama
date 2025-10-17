import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DocumentLayout from './DocumentLayout';
import CreateDocument from './CreateDocument';
import ListCompleteDocument from './ListCompleteDocument';
import HomeDocument from './HomeDocument';
import ListPatientDocument from './ListPatientDocument';
import OneDocument from './OneDocument';

const DocumentTrainerRouter = () => {
    return (
        <Routes>
            <Route element={<DocumentLayout />}>
                <Route path="/" element={<HomeDocument />} />
                <Route path="new" element={<CreateDocument />} />
                <Route path="listcomplete" element={<ListCompleteDocument />} />
                <Route path="list/:id" element={<ListPatientDocument />} />
                <Route path="one/:id" element={<OneDocument />} />
            </Route>
        </Routes>
    );
};

export default DocumentTrainerRouter;