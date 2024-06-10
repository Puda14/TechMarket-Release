import React from 'react';
import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';

function ConfirmCheckout({ customerId, totalAmount, paymentMethod }) {
    return (
        <div className='bg-gray-50'>
            <Navbar />
            <div className='mt-20'></div>
            <div className='flex justify-center'>
                <div className=' bg-white p-8 shadow-md rounded-md w-full max-w-4xl'>
                    <div className='flex items-center justify-center'>
                        <h1 className='font-bold text-3xl'>Thanh Toán Thành Công</h1>
                    </div>
                    <div className='flex items-center justify-center text-white bg-green-500 h-12 w-auto mt-4'>
                        <CheckCircleIcon />
                        <div className='text-2xl ml-2'>Giao dịch của bạn đã được hoàn thành</div>
                    </div>

                    <div className=' w-[50%] mt-4 ml-[196px]'>
                        <div className='flex flex-col gap-4 '>
                            <div className='flex justify-between border-b-2 py-2'>
                                <p className='text-slate-400'>Mã Khách Hàng</p>
                                <p>{customerId}</p>
                            </div>
                            <div className='flex justify-between border-b-2 py-2'>
                                <p className='text-slate-400'>Tổng số tiền</p>
                                <p>{totalAmount}</p>
                            </div>
                            <div className='flex justify-between border-b-2 py-2'>
                                <p className='text-slate-400'>Phương thức thanh toán</p>
                                <p>{paymentMethod}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center my-4'>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button variant="outlined" href='/' sx={{ minWidth: '150px', padding: '0 60px' }} >Trang Chủ</Button>
                            <Button variant="outlined" href='/order-details' sx={{ minWidth: '150px' }}>Xem Chi Tiết Đơn Hàng</Button>
                        </Box>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
}

export default ConfirmCheckout;
