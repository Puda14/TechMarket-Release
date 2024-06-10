import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../page/customer/Home.jsx";
import Login from "../page/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CategoryItem from "../page/customer/CategoryItem.jsx";
import DetailProduct from "../page/customer/DetailProduct.jsx";
import CreateAccount from "../page/customer/CreateAccount.jsx";
import ShoppingCart from "../page/customer/ShoppingCart.jsx";
import Chatboard from "../page/customer/Chatboard/Chatboard.jsx";
import HomeManage from "../page/manage/layout/HomeManage.jsx";
import Users from "../page/manage/Users.jsx";
import Products from "../page/manage/Products.jsx";
import DetailUserInfor from "../page/customer/DetailUserInfor.jsx";
import OrderStatus from "../page/customer/OrderStatus.jsx";
import ManageStatusProduct from "../page/manage/ManageStatusProduct.jsx";
import Dashboard from "../page/manage/Dashboard.jsx";
import ConfirmCheckout from "../page/customer/ConfirmCheckout.jsx";
import ConfirmEmail from "../page/customer/ConfirmEmail.jsx";
import { useDispatch } from "react-redux";
import { productApi } from "../../api/productApi.js";
import { fetchData } from "../store/actions/productsAction.js";
import ForgotPassword from "../page/customer/ForgotPassword.jsx";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
function AppRouters() {
    const dispatch = useDispatch();
    const fetchDataAsync = async () => {
        try {
            const res = await productApi.getProduct();
            dispatch(fetchData(res.data.data));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchDataAsync();
    }, []);
    return (
        <div>
            <ScrollToTop />
            <Routes>
                {/* Shared */}
                <Route path="/login" element={<Login />} />
                <Route path="/confirmemail" element={<ConfirmEmail />} />
                <Route path={'/forgotpassword'} element={<ForgotPassword />} />
                {/* Customer */}
                <Route path="/" element={<Home />} />
                <Route path="/createAccount" element={<CreateAccount />} />
                <Route
                    path="/orderstatus"
                    element={
                        <PrivateRoute roles={['customer']}>
                            <OrderStatus />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/category/:categoryID"
                    element={
                        <PrivateRoute roles={['customer']}>
                            <CategoryItem />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/infor"
                    element={
                        <PrivateRoute roles={['customer']}>
                            <DetailUserInfor />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products/:productID"
                    element={
                        <PrivateRoute roles={['customer', 'employee', 'manager']}>
                            <DetailProduct />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <PrivateRoute roles={['customer']}>
                            <ShoppingCart />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/checkout-success"
                    element={
                        <PrivateRoute roles={['customer']}>
                            <ConfirmCheckout />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute roles={['employee', 'customer']}>
                            <Chatboard />
                        </PrivateRoute>
                    }
                />

                {/* Employee and Manage */}
                <Route
                    path="/managehome"
                    element={
                        <PrivateRoute roles={['employee', 'manager']}>
                            <HomeManage />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Navigate to="products" replace />} />
                    <Route
                        path="dashboard"
                        element={
                            <PrivateRoute roles={['manager']}>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="chat"
                        element={
                            <PrivateRoute roles={['employee']}>
                                <Chatboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="users"
                        element={
                            <PrivateRoute roles={['manager']}>
                                <Users />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="products"
                        element={
                            <PrivateRoute roles={['employee', 'manager']}>
                                <Products />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="managestatusproduct"
                        element={
                            <PrivateRoute roles={['manager', 'employee']}>
                                <ManageStatusProduct />
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default AppRouters;
