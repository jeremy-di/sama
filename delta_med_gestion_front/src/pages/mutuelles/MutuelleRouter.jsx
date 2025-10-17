import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MutuelleLayout from './MutuelleLayout';
import HomeMutuelle from './HomeMutuelle'
import CreateMutuelle from './CreateMutuelle';
import ListMutuelle from './ListMutuelle';
import OneMutuelle from './OneMutuelle';
import UpdateMutuelle from './UpdateMutuelle';

const MutuelleRouter = () => {
    return (
        <Routes>
            <Route element={<MutuelleLayout />}>
                <Route path="/" element={<HomeMutuelle />} />
                <Route path="new" element={<CreateMutuelle />} />
                <Route path="list" element={<ListMutuelle />} />
                <Route path="one/:id" element={<OneMutuelle />} />
                <Route path="update/:id" element={<UpdateMutuelle />} />
            </Route>
        </Routes>
    );
};

export default MutuelleRouter;