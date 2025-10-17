import React from 'react';
import Header from '../../components/Header';
import { Outlet } from 'react-router-dom';
import FormateurSidebar from '../../components/FormateurSidebar';

const FormateurLayout = () => {
    return (
        <div>
            <Header />
            <FormateurSidebar />
            <Outlet />
        </div>
    );
};

export default FormateurLayout;