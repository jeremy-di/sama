import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CPLayout from './CPLayout';
import CreateCP from './CreateCP';
import ListCP from './ListCP';
import OneCP from './OneCP';
import UpdateCP from './UpdateCP';
import HomeCP from './HomeCP';

const CPRouter = () => {
    return (
        <Routes>
            <Route element={<CPLayout />}>
                <Route path="/" element={<HomeCP />} />
                <Route path="new" element={<CreateCP />} />
                <Route path="list" element={<ListCP />} />
                <Route path="one/:id" element={<OneCP />} />
                <Route path="update/:id" element={<UpdateCP />} />
            </Route>
        </Routes>
    );
};

export default CPRouter;