import React, {useEffect, useReducer, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Content from "../../component/Content.jsx";
import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Breadcrumbs, Typography} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

function CategoryItem() {
    const {categoryID} = useParams();
    const [products, setProducts] = useState([])
    const productList = useSelector(state => state.products.data)

    useEffect(() => {
        setProducts(productList.filter(p => p.category.includes(categoryID)))
    }, [categoryID,productList]);
    return (
        <div className={'bg-gray-50 '}>
            <div className={'mx-20'}>
                <Navbar/>
                <Breadcrumbs  separator={<NavigateNextIcon fontSize="small" />}
                              aria-label="breadcrumb" className={'!mt-[80px] cursor-pointer pt-5'}>
                    <Link className={'hover:underline'} color="inherit" to="/">
                        <div  className={'flex items-center'}>
                            <HomeIcon className={'mr-2'}/><div>Trang chủ</div>
                        </div>
                    </Link>
                    <Typography color="text.primary">{categoryID}</Typography>
                </Breadcrumbs>
                <h1 className={'mt-8 -mb-12 font-medium italic'}>Bạn đang tìm kiếm <span
                    className={'text-blue-500 ml-2 text-xl'}>{categoryID}</span></h1>
                <Content priceShow={true} brandShow={true} saleShow={true} categoryShow={false} stockShow={true}
                         product={products}/>
                <Footer/>
            </div>
        </div>
    );
}

export default CategoryItem;