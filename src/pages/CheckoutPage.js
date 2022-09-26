import React from 'react';
import Checkout from '../components/checkout/Checkout';
import MainLayout from '../layouts/mainLayout/MainLayout';

const CheckoutPage = () => {
    return (
        <MainLayout title="Checkout">
            <Checkout />
            
           
        </MainLayout>
    );
};

export default CheckoutPage;