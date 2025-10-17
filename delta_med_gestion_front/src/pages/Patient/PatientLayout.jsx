import React from 'react';
import Header from '../../components/Header';
import { Outlet } from 'react-router-dom';

const PatientLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default PatientLayout;