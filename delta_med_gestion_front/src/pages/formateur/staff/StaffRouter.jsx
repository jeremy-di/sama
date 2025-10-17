import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StaffLayout from './StaffLayout';
import Register from './Register';
import FormateurMenu from '../FormateurMenu';
import ListUsers from './ListUsers';
import OneUser from './OneUser';
import UpdatePassword from './UpdatePassword';
import Profil from './Profil';

const StaffRouter = () => {
    return (
        <Routes>
            <Route element={<StaffLayout />}>
                <Route path="register" element={<Register />} />
                <Route path="list" element={<ListUsers />} />
                <Route path=":id" element={<OneUser />} />
                <Route path="myprofil" element={<Profil />} />
                <Route path="newpassword" element={<UpdatePassword />} />
            </Route>
        </Routes>
    );
};

export default StaffRouter;