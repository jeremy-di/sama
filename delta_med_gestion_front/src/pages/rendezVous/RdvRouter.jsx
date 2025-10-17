import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RdvLayout from './RdvLayout';

const rdvRouter = () => {
    return (
        <Routes>
            <Route element={<RdvLayout />}>

            </Route>
        </Routes>
    );
};

export default rdvRouter;