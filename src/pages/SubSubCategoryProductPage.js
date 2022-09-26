import React from 'react';
import { useParams } from 'react-router';
import MainLayout from '../layouts/mainLayout/MainLayout';
import SubSubCategoryProduct from '../components/productCategories/SubSubCategoryProduct';

const SubSubCategoryProductPage = () => {

    const { id } = useParams()
    
    return (
        <MainLayout>
            <section className="sub_category_section">
                <SubSubCategoryProduct id={id} />
            </section>
        </MainLayout>
    );
};

export default SubSubCategoryProductPage