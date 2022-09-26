import React from 'react';
import AddressBook from '../components/dashboard/AddressBook';
import DashboardLayout from '../layouts/dashboardLayout/DashboardLayout';

const AddressBookPage = () => {
    return (
        <DashboardLayout title="Acccount">
            <AddressBook />
        </DashboardLayout>
    );
};

export default AddressBookPage;