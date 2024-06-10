import Navbar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import DetailProductContent from "../../component/DetailProductContent.jsx";
import Comment from "../../component/Comment.jsx";
import {Box, Tab, Tabs, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import SuggestProduct from "../../component/SuggestProduct.jsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {productApi} from "../../../api/productApi.js";
import {fetchData} from "../../store/actions/productsAction.js";

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function DetailProduct() {
    const [value, setValue] = useState(0);
    const { productID } = useParams();
    const productList = useSelector(state => state.products.data)
    const filteredProduct = productList.filter(product => product._id === productID)||[];
    const [product,setProduct] = useState(filteredProduct[0])
    useEffect(()=>{
        const filteredProduct = productList.filter(product => product._id === productID);
        if (filteredProduct.length > 0) {
            setProduct(filteredProduct[0]);
        } else {
            console.log("Không tìm thấy sản phẩm với ID này.");
        }
    },[productID,productList])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (

            <div className={'bg-gray-50 '}>
                <div className={'mx-20'}>
                    <Navbar/>
                    <DetailProductContent product={product}/>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Thông tin chi tiết" {...a11yProps(0)} />
                                <Tab label="Bình luận" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            {product?.desc}
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <Comment productID ={productID}/>
                        </CustomTabPanel>

                    </Box>
                    <SuggestProduct/>
                    <Footer/>
                </div>
            </div>

    );
}

export default DetailProduct;