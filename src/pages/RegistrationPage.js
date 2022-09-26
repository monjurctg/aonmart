import React from 'react';
import Registration from '../components/authentication/Registration';
import MainLayout from '../layouts/mainLayout/MainLayout';

const RegistrationPage = () => {
    
    return (
        <MainLayout title="Registration">
            <Registration />
        </MainLayout>
    );
};

export default RegistrationPage;