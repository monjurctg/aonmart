import Axios from 'axios';
import * as Types from "../Type/Types";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getRecommendProductList = () => (dispatch) => {
    const data = [
        {
            id: "1",
            name: "Tometo",
            category: "Vegetable",
            img: "https://i.ibb.co/m8GSKVV/03.png",
            sku: "tometo",
            weigth: "1Kg",
            defaultPrice: "10",
            offerPrice: "8",
            currentStock: "",
        },
        {
            id: "2",
            name: "carrot",
            category: "Vegetable",
            img: "https://i.ibb.co/QvPgsSk/01.png",
            sku: "carrot",
            weigth: "1Kg",
            defaultPrice: "10",
            offerPrice: "8",
            currentStock: "200kg",
        },
        {
            id: "3",
            name: "Shalgum",
            category: "Vegetable",
            img: "https://i.ibb.co/DDB5XJB/02.png",
            sku: "shalgum",
            weigth: "1Kg",
            defaultPrice: "10",
            offerPrice: "8",
            currentStock: "200kg",
        },
        {
            id: "4",
            name: "Vutta",
            category: "Vegetable",
            img: "https://i.ibb.co/JK8NHmr/04.png",
            sku: "vutta",
            weigth: "1Kg",
            defaultPrice: "10",
            offerPrice: "8",
            currentStock: "200kg",
        },
        {
            id: "5",
            name: "Tometo",
            category: "Vegetable",
            img: "https://i.ibb.co/m8GSKVV/03.png",
            sku: "tometo",
            weigth: "1Kg",
            defaultPrice: "10",
            offerPrice: "8",
            currentStock: "200kg",
        },
        {
            id: "5",
            name: "carrot",
            category: "Vegetable",
            img: "https://i.ibb.co/QvPgsSk/01.png",
            sku: "carrot",
            weigth: "1Kg",
            defaultPrice: "10",
            offerPrice: "8",
            currentStock: "",
        },
        {
            id: "6",
            name: "Shalgum",
            category: "Vegetable",
            img: "https://i.ibb.co/DDB5XJB/02.png",
            sku: "shalgum",
            weigth: "1Kg",
            defaultPrice: "10",
            offerPrice: "8",
            currentStock: "",
        },
        {
            id: "8",
            name: "Vutta",
            category: "Vegetable",
            img: "https://i.ibb.co/JK8NHmr/04.png",
            sku: "vutta",
            weigth: "1Kg",
            defaultPrice: "10",
            offerPrice: "8",
            currentStock: "200kg",
        },


    ]
    dispatch({ type: Types.GET_RECOMMEND_PRODUCT_LIST, payload: data });
}