import React from 'react';
import OrderHorizantalCard from './OrderHorizantalCard';
import OrderlistNavbar from './OrderlistNavbar';

const OrderComplete = () => {
    return (
        <React.Fragment>
            <OrderHorizantalCard status="Delivered" />
        </React.Fragment>
    );
};

export default OrderComplete;