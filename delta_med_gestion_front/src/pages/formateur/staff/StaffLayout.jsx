import React from 'react';
import Header from '../../../components/Header';
import { Outlet } from 'react-router-dom';

const StaffLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default StaffLayout;