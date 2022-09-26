import React from 'react';
import PasswordChange from '../components/dashboard/PasswordChange';
import DashboardLayout from './../layouts/dashboardLayout/DashboardLayout';

const ChangePasswordPage = () => {
    return (
        <DashboardLayout>
            <PasswordChange />
        </DashboardLayout>
    );
};

export default ChangePasswordPage;