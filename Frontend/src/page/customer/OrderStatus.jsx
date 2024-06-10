import React, {useEffect, useState} from 'react';
import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {formatNumber} from "../../utils/formatNumber.js";
import {orderApi} from "../../../api/orderApi.js";

function OrderStatus(props) {
    const [orderProduct,setOrderProduct] = useState()
    const userID = JSON.parse(localStorage.getItem('session')).userDetails._id

    const fetch = async ()=>{
       const res = await orderApi.getOrderByUserId(userID)
        console.log(res.data)
        setOrderProduct(res.data)
    }
    useEffect(()=>{
        fetch()
    },[])

    const Status = ({stat}) => {
        switch (stat) {
            case 'success':
                return <span
                    className={'font-bold italic text-success'}>Giao thành công !</span>
        }
    }

    return (
        <div className={'bg-gray-50'}>
            <div className={'mx-20'}>
                <Navbar/>
                <div className={'mt-20'}>
                    <h1 className={'font-bold text-xl uppercase py-6'}>
                        Danh sách đơn hàng của bạn
                    </h1>
                    <div>
                        <div className={'grid grid-cols-[auto,20%,20%,20%] text-gray-400 place-items-center' }>
                            <p className={'w-full'}>Sản phẩm</p>
                            <p>Số lượng đã mua</p>
                            <p>Giá</p>
                            <p>Thành tiền</p>
                        </div>
                        <div className={''}>
                            {
                                orderProduct?.length !== 0 ?
                                    orderProduct?.map((e, i) => (
                                        <div key={i}
                                             className={'flex flex-col justify-center items-center mb-10 border-[1px] border-gray-200 bg-white'}>
                                            <div
                                                className={'grid  py-4  grid-cols-[auto,20%,20%,20%] w-full  place-items-center'}>
                                                        <Link to={`/products/${e._id}`} className={'flex items-center w-full pl-2'}>
                                                            <img src={e?.image?.url} alt=""
                                                                 className={'bg-cover bg-no-repeat bg-center w-20 h-20 mr-4'}/>
                                                            <p className={'!line-clamp-2 '}>{e.name}</p>
                                                        </Link>
                                                        <div className={''}>{e.quantity}</div>
                                                        <p className={''}>{formatNumber(e.price)}đ</p>
                                                        <p className={''}>{formatNumber(e.price*e.quantity)}đ</p>

                                                </div>
                                            <div className={'pb-4'}>
                                                Trang thái: <Status stat={'success'}/>
                                            </div>
                                        </div>
                                    ))
                                    : <div
                                        className={'h-[300px] flex bg-white items-center justify-center font-medium text-2xl italic text-red-600'}>
                                        Bạn chưa mua sản phẩm nào
                                    </div>
                            }
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default OrderStatus;