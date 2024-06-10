import Slide from "../../component/Slide.jsx";
import Sale from "../../component/Sale.jsx";
import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import Content from "../../component/Content.jsx";
import Category from "../../component/Category.jsx";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { connect, useDispatch, useSelector } from "react-redux";
import { getActions } from "../../store/actions/authActions.js";
import { connectWithSocketServer } from "../../realtimeCommunication/socketConnection.js";
import { productApi } from "../../../api/productApi.js";
import { fetchData } from "../../store/actions/productsAction.js";
import productsReducer from "../../store/reducers/productsReducer.js";
import ChatIcon from "./Chatboard/ChatIcon.jsx";
import {useNavigate} from "react-router-dom";

function Home() {
  const products = useSelector((state) => state.products.data);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem('session')) || { isLoggedIn: false, userDetails: {} };
  const { isLoggedIn, userDetails } = session;

  useEffect(() => {
    if (isLoggedIn) {
      const { role } = userDetails;
      if (role === 'manager' || role === 'employee') {
        navigate('/managehome');
      }
    }
  }, [isLoggedIn, userDetails, navigate]);

  useEffect(() => {
    setLoading(false);
    const userDetails = localStorage.getItem("token");
    connectWithSocketServer(userDetails);
  }, []);

  if (loading) {
    return (
      <Box className={"w-[100vw] h-[100vh] flex justify-center items-center"}>
        <CircularProgress />
      </Box>
    );
  } else
    return (
      <div className={"bg-gray-50  relative"}>
        <div className={"mx-20 "}>
          <Navbar />
          <div className={'mt-20'}></div>
          <Slide  />
          <Category />
          {/*<Sale />*/}
          <Content
            priceShow={true}
            brandShow={true}
            saleShow={true}
            categoryShow={true}
            stockShow={true}
            product={products}
          />
          <Footer />
        </div>
        <ChatIcon />
      </div>
    );
}

export default Home;
