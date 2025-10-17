import React from 'react';
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom';

const rdvLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default rdvLayout;