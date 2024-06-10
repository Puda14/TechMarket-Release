import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Breadcrumbs, Button, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from "react-redux";
import NavigateNextIcon from "@mui/icons-material/NavigateNext.js";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from "@mui/icons-material/Home.js";
import { addCart, deleteAll } from "../store/actions/cartAction.js";
import { formatNumber } from "../utils/formatNumber.js";
import { notify } from "../utils/toastify.js";
import Rating from '@mui/material/Rating';
import { checkoutApi, productApi } from "../../api/productApi.js";

function DetailProductContent({ product }) {
    const dispatch = useDispatch();
    const { productID } = useParams();
    const userID = JSON.parse(localStorage.getItem('session')).userDetails._id;
    const [productPurchased, setProductPurchased] = useState([{ id: productID, quantity: 0 }]);
    const [productShow, setProductShow] = useState(product);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setProductShow(product);
        setCount(0);
    }, [product]);

    function addCount() {
        setCount(count + 1);
    }

    function subCount() {
        setCount(count - 1);
    }

    const discountedPrice = productShow?.price * (100 - parseFloat(productShow?.sale)) / 100;

    useEffect(() => {
        setProductPurchased(state => [{ id: productID, quantity: count }]);
    }, [count]);

    return (
        <div className="mt-20">
            <Breadcrumbs maxItems={3} separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb" className="mt-20 cursor-pointer pt-5">
                <Link className="hover:underline" color="inherit" to="/">
                    <div className="flex items-center">
                        <HomeIcon className="mr-2" />
                        <div>Trang Chủ</div>
                    </div>
                </Link>
                <Typography color="text.primary" className="line-clamp-1 w-[300px]">{productShow?.name}</Typography>
            </Breadcrumbs>
            <div className="flex flex-col lg:flex-row mt-4">
                <div className="lg:basis-1/2">
                    <img src={productShow?.image?.url} alt="" className="bg-cover bg-no-repeat bg-center w-[90%] mx-auto" />
                </div>
                <div className="lg:basis-1/2 mt-4 lg:mt-0">
                    <h1 className="font-bold text-2xl lg:text-lg">{productShow?.name}</h1>
                    <p>Hãng: <span>{productShow?.brand}</span></p>
                    <Rating name="size-large" defaultValue={productShow?.rate} className="my-6" precision={0.5} readOnly />
                    <p className="text-gray-600 line-clamp-1 italic mb-4">{productShow?.desc}</p>
                    {productShow?.sale ? (
                        <div className="text-start">
                            <p className="text-gray-500 font-normal">
                                <span className="line-through">{formatNumber(productShow?.price)}<span>đ</span></span>
                                <span className="text-red-600 ml-2">-{productShow?.sale}</span>
                            </p>
                            <p className="text-black text-xl font-medium">
                                {formatNumber(discountedPrice)}
                                <span className="text-lg">đ</span>
                            </p>
                        </div>
                    ) : (
                        <p className="text-black text-xl font-medium">
                            {formatNumber(productShow?.price)}
                            <span className="text-lg">đ</span>
                        </p>
                    )}
                    <div className="flex items-center mt-8">
                        <p className="mr-10 md:mr-2">Số lượng</p>
                        <Button variant="outlined" onClick={subCount} className="!min-w-0" disabled={count < 1}>-</Button>
                        <div className="px-4">{count}</div>
                        <Button variant="outlined" onClick={addCount} className="!min-w-0" disabled={count >= productShow?.stock}>+</Button>
                        <h1 className="ml-4 md:mr-1">Còn: {productShow?.stock}</h1>
                    </div>
                    <div className="hidden md:grid grid-cols-2 mt-8 gap-3 ">
                        <Button variant="contained" startIcon={<AddShoppingCartIcon />} disabled={count < 1}
                            onClick={async () => {
                                notify('info', 'Added to cart');
                                await productApi.updateUserCart(userID, productShow._id);
                                dispatch(addCart({
                                    ...productShow,
                                    quantity: count,
                                    checked: true
                                }));
                            }}>Thêm vào giỏ hàng</Button>
                        <Button variant="contained" startIcon={<ShoppingCartIcon />} disabled={count < 1}
                            onClick={async () => {
                                await checkoutApi.checkout({ userId: userID, cartItems: productPurchased });
                            }}>Mua ngay</Button>
                    </div>
                    <div className="grid grid-cols-2 mt-8 gap-3 md:hidden">
                        <Button variant="contained" startIcon={<AddShoppingCartIcon />} disabled={count < 1}
                            onClick={async () => {
                                notify('info', 'Added to cart');
                                await productApi.updateUserCart(userID, productShow._id);
                                dispatch(addCart({
                                    ...productShow,
                                    quantity: count,
                                    checked: true
                                }));
                            }}>Thêm</Button>
                        <Button variant="contained" startIcon={<ShoppingCartIcon />} disabled={count < 1}
                            onClick={async () => {
                                await checkoutApi.checkout({ userId: userID, cartItems: productPurchased });
                            }}>Mua</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProductContent;
