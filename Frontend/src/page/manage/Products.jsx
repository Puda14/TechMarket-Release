import React, { useEffect, useState } from 'react';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/formatNumber.js";
import { useDispatch, useSelector } from "react-redux";
import ModalEditProduct from "../../component/ModalEditProduct.jsx";
import ModalCreateProduct from "../../component/ModalCreateProduct.jsx";
import ModalViewProduct from "../../component/ModalViewProduct.jsx";
import { productApi } from "../../../api/productApi.js";
import { fetchData } from "../../store/actions/productsAction.js";
import eventEmitter from "../../utils/eventEmitter.js";
import { notify } from "../../utils/toastify.js";

function Products() {
    const products = useSelector(state => state.products.data);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState(null);

    const fetchDataAsync = async () => {
        try {
            const res = await productApi.getProduct();
            console.log(res)
            dispatch(fetchData(res.data.data));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        eventEmitter.on('createProductDone', fetchDataAsync);
        return () => {
            eventEmitter.removeListener('createProductDone', fetchDataAsync);
        };
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            await productApi.deleteProduct(selectedProductId);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
        finally {
            setIsLoading(false)
            notify('success', 'Xoá thành công')
            fetchDataAsync();
            setOpen(false);
        }
    };

    const handleOpen = (productId) => {
        setSelectedProductId(productId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ProductCart = () => {
        if (filteredProducts.length !== 0)
            return filteredProducts.map((e, i) => (
                <div key={i}
                    className={'grid mb-4 py-4 bg-white border-[1px] border-gray-200 grid-cols-[auto,15%,15%,20%] '}>
                    <div className={'flex items-center justify-start'}>
                        <div className={'flex items-center'}>
                            <a href={`/products/${e?._id}`} target={'_blank'} className={'flex items-center'}>
                                <img src={e?.image?.url} alt=""
                                    className={'bg-cover bg-no-repeat bg-center w-20 h-20 mx-4'} />
                                <p className={'!line-clamp-2 '}>{e.name}</p>
                            </a>
                        </div>
                    </div>
                    <p className={'flex items-center justify-center'}>{formatNumber(e.price)}đ</p>
                    <p className={'flex items-center justify-center'}>{e.stock}</p>
                    <div className={'flex items-center justify-end'}>
                        <div className={'flex items-center space-x-2 mx-2'}>
                            <ModalViewProduct product={e} id={e?._id} />
                            <Button variant="contained" color="error"
                                className={'min-h-[40px] !w-[60px] !text-[12px]'}
                                onClick={() => handleOpen(e._id)}>Xoá</Button>
                        </div>
                    </div>
                </div>
            ));
        else return (
            <div
                className={'h-[300px] flex bg-white items-center justify-center font-medium text-2xl italic text-red-600'}>
                Trống!
            </div>
        );
    };

    return (
        <div className={''}>
            <div>
                <h1 className={'text-lg font-bold uppercase '}>Tất cả sản phẩm đang bán</h1>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 mt-8 mb-4 border border-gray-300 rounded"
                />
                <div className={'w-full grid  mt-2 grid-cols-[auto,15%,15%,20%] text-gray-400 '}>
                    <div className={'flex items-center'}>
                        <p className={'ml-4 text-center'}>Hình ảnh</p>
                        <p className={'ml-28 text-center'}>Tên sản phẩm</p>
                    </div>
                    <div className={'flex items-center justify-center'}>
                        <p className={''}>Giá</p>
                    </div>
                    <div className={'flex items-center justify-center'}>
                        <p className={'text-center'}>Tồn kho</p>
                    </div>
                    <div className={'flex items-center justify-end'}>
                        <ModalCreateProduct />
                    </div>
                </div>
                <div className={'mt-4 h-[calc(100vh-201px)] overflow-y-auto custom-scroll'}>
                    <div><ProductCart /></div>
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa sản phẩm này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : 'Xoá'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Products;
