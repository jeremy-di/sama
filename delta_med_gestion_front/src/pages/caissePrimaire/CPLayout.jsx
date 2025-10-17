import React from 'react';
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom';

const CPLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default CPLayout;