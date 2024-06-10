import React from 'react';
import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from "react-router-dom";
function ConfirmEmail(props) {
    return (
        <div className='bg-gray-50'>
            <Navbar />
            <div className='mt-20'></div>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center  w-[50%] h-fit">
                    <div className='flex justify-center items-center text-green-500'><CheckCircleIcon /></div>
                    <h2 className="text-2xl font-bold text-gray-800 mt-4">Đăng ký thành công!</h2>
                    <p className="text-gray-600 mt-2">Cảm ơn bạn đã đăng ký. Sử dụng tài khoản để đăng nhập và trải nghiệm ngay.</p>
                    <Link to={'/'}>
                        <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
                            Trở về trang chủ
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ConfirmEmail;