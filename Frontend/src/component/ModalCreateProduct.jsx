import React, { useState } from 'react';
import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    Grid,
    Input,
    Avatar,
    IconButton,
    CircularProgress
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { productApi } from "../../api/productApi.js";
import {notify} from "../utils/toastify.js";
import eventEmitter from "../utils/eventEmitter.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalCreateProduct(props) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        alias: "",
        desc: "",
        brand: "",
        price: "",
        category: "",
        stock: 0,
        image: "",
        rate: 5
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price') {
            const formattedValue = formatPrice(value);
            setProduct({ ...product, [name]: formattedValue });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct({ ...product, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const categoriesArray = product.category.split(',').map(item => item.trim());
        const productData = {
            ...product,
            category: categoriesArray,
            price: parseFloat(product.price.replace(/,/g, '')) // Convert price back to a number
        };
       try {
           const res = await productApi.createProduct(productData);
           notify('success','Thêm sản phẩm thành công!')
       }
       catch (e) {
          notify('error',e.response.data.error)
       }
       finally {
           eventEmitter.emit('createProductDone')
           setIsLoading(false);
           handleClose();
       }
    };

    const formatPrice = (value) => {
        return value.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div>
            <Button onClick={handleOpen} variant={'contained'}>Thêm mới</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={'!border-0'}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thông tin sản phẩm muốn thêm mới
                    </Typography>
                    <Box component="form" sx={{ mt: 2 }} noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Tên"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Bí danh"
                                    name="alias"
                                    value={product.alias}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mô tả"
                                    name="desc"
                                    value={product.desc}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Hãng"
                                    name="brand"
                                    value={product.brand}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Loại"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Giá"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Số lượng"
                                    name="stock"
                                    type="number"
                                    value={product.stock}
                                    onChange={handleChange}
                                />
                            </Grid>
                            {/*<Grid item xs={4}>*/}
                            {/*    <TextField*/}
                            {/*        fullWidth*/}
                            {/*        label="Đánh giá"*/}
                            {/*        name="rate"*/}
                            {/*        type="number"*/}
                            {/*        value={product.rate}*/}
                            {/*        onChange={handleChange}*/}
                            {/*    />*/}
                            {/*</Grid>*/}
                        </Grid>
                        <Grid item xs={12} className={'flex justify-between items-center !mt-8'}>
                            <div className={'grid grid-cols-[40%,auto] gap-8 w-full'}>
                                <div className={'flex items-center'}>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="icon-button-file"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="icon-button-file" className={'flex items-center bg-blue-200 rounded-2xl py-2 px-4 '}>
                                        <p>Upload ảnh sản phẩm</p>
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </div>
                                {product.image && (
                                    <img src={product.image} alt="Product Image" className={'w-auto h-[200px]'} />
                                )}
                            </div>
                        </Grid>

                        <Box sx={{ mt: 3, textAlign: 'right' }}>
                            <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? <CircularProgress size={24} /> : 'Thêm mới'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalCreateProduct;
