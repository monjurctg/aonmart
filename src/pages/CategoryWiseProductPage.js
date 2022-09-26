import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import CategoryWiseProduct from '../components/productCategories/CategoryWiseProduct';
import MainLayout from '../layouts/mainLayout/MainLayout';

const CategoryWiseProductPage = () => {

    const { id } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return (
        <MainLayout>
            <CategoryWiseProduct id={id} />
        </MainLayout>
    );
};

export default CategoryWiseProductPage;