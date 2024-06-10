import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar.jsx";
import Footer from "../component/Footer.jsx";
import { Box, Button, CircularProgress } from "@mui/material";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function PrivateRoute(props) {
    const session = JSON.parse(localStorage.getItem('session')) || { isLoggedIn: false, userDetails: {} };
    const { isLoggedIn, userDetails } = session;
    const { role } = userDetails;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Box className="w-[100vw] h-[100vh] flex justify-center items-center">
                <CircularProgress />
            </Box>
        );
    }

    if (isLoggedIn) {
        if (props.roles && !props.roles.includes(role)) {
            return (
                <div className="mx-20">
                    <Navbar />
                    <div
                        className="mt-52 mb-36 font-extrabold text-3xl text-red-400 italic text-center"
                    >
                        <div>Bạn không có quyền truy cập trang này!</div>
                        <Link to="/">
                            <Button
                                variant="contained"
                                className="!mt-10 p-6 text-2xl font-bold"
                            >
                                Trở về trang chủ
                            </Button>
                        </Link>
                    </div>
                    <Footer />
                </div>
            );
        }
        return <>{props.children}</>;
    } else {
        return (
            <div className="mx-20">
                <Navbar />
                <div
                    className="mt-52 mb-36 font-extrabold text-3xl text-red-400 italic text-center"
                >
                    <div>Bạn cần đăng nhập để tiếp tục hành động của mình!</div>
                    <Link to="/login">
                        <Button
                            variant="contained"
                            className="!mt-10 p-6 text-2xl font-bold"
                        >
                            Đăng nhập
                        </Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStoreStateToProps = ({ auth }) => {
    return {
        ...auth,
    };
};

export default connect(mapStoreStateToProps)(PrivateRoute);
