import React from 'react';
import { useParams } from 'react-router';
import SubCategory from '../components/productCategories/SubCategory';
import MainLayout from '../layouts/mainLayout/MainLayout';

const SubCategoryPage = () => {
    let { id } = useParams();

    return (
        <MainLayout title="Sub-Category">
            <section className="sub_category_section">
                <SubCategory id={id} />
            </section>
        </MainLayout>
    );
};

export default SubCategoryPage;