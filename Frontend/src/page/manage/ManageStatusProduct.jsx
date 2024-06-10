import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {formatNumber} from "../../utils/formatNumber.js";
import EastIcon from '@mui/icons-material/East';
import {orderApi} from "../../../api/orderApi.js";
import {productApi} from "../../../api/productApi.js";

function ManageStatusProduct() {
    const [orderProduct,setOrderProduct] = useState()
    const getImg = async (id)=>{
        try {
            const res = await productApi.getProductById(id)
            console.log('>>>',res.data)
            return res.data
        }catch (e){
            console.log(e)
        }
    }

    const fetch = async ()=>{
        const res = await orderApi.getAllOrder()
        setOrderProduct(res.data.data)
        console.log(res.data.data[0].products[0].id)
       await getImg('66139e04367b3917b84c57c5')
    }
    useEffect(()=>{
        fetch()
    },[])

    const Status = ({stat}) => {
        switch (stat) {
            case 'success':
                return (
                    <div>
                        Trang thái:
                        <span className={'font-bold italic text-success'}> Giao thành công </span>
                        <EastIcon/>
                        <span>Tới:<span className={'font-bold'}> Bùi Đăng Đức</span></span>
                    </div>
                )
            ////code cac trang thai và co các nút như huy,.....
                //// them phan quyen
            case '.....':
                return (
                    <div>
                        Trang thái:
                        <span className={'font-bold italic text-success'}> Giao thành công </span>
                        <EastIcon/>
                        <span>Tới:<span className={'font-bold'}> Bùi Đăng Đức</span></span>
                    </div>
                )
        }
    }

    return (
        <div className={'h-[calc(100vh-112px)]'}>
                <div className={''}>
                    <h1 className={'font-bold text-lg uppercase'}>
                        Danh sách đơn hàng của bạn
                    </h1>
                    <div className={'mt-20 h-full'}>
                        <div className={'grid grid-cols-[auto,20%,20%,20%] text-gray-400 place-items-center' }>
                            <p className={'w-full'}>Người mua</p>
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
                                                <Status stat={'success'}/>
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
            </div>
    );
}

export default ManageStatusProduct;