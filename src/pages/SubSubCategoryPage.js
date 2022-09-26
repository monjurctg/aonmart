import React from 'react';
import { useParams } from 'react-router';
import MainLayout from '../layouts/mainLayout/MainLayout';
import SubSubCategory from '../components/productCategories/SubSubCategory';

const SubSubCategoryPage = () => {

    const { id } = useParams()
    
    return (
        <MainLayout>
            <section className="sub_category_section">
                <SubSubCategory id={id} />
            </section>
        </MainLayout>
    );
};

export default SubSubCategoryPage;