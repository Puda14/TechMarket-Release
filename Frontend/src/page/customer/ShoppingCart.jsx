import React, {useEffect, useState} from 'react';
import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import Cart from "../../component/Cart.jsx";
import {productApi} from "../../../api/productApi.js";
import {fetchData} from "../../store/actions/productsAction.js";
import {useDispatch} from "react-redux";
import {Box, CircularProgress} from "@mui/material";

function ShoppingCart(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);
    if (loading) {
        return (
            <Box className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
                <CircularProgress />
            </Box>
        );
    } else
    return (
            <div className={'bg-gray-50 '}>
                <div className={'mx-20'}>
                    <Navbar/>
                    <Cart/>
                    <Footer/>
                </div>
            </div>

);
}

export default ShoppingCart;