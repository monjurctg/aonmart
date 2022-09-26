import React from 'react';
import DashboardLayout from '../layouts/dashboardLayout/DashboardLayout';
import UserProfile from './../components/dashboard/UserProfile';

const UserAccount = () => {
    return (
        <DashboardLayout title="Acccount">
            <UserProfile />
        </DashboardLayout>
    );
};

export default UserAccount;