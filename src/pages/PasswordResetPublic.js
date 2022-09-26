import React, { useEffect } from 'react';
import MainLayout from '../layouts/mainLayout/MainLayout';
import PasswordChange from './../components/dashboard/PasswordChange';
import ResetPassword from './../components/authentication/ResetPassword';

const PasswordResetPublic = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <MainLayout title="Sign In ">
            <div className="container pt-5">
                <ResetPassword />
            </div>
        </MainLayout>
    );
};

export default PasswordResetPublic;