import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import unidecode from "unidecode";
import Card from "./Card.jsx";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, FormControlLabel, Radio, Box, IconButton, Drawer } from "@mui/material";

function Content({ brandShow, priceShow, stockShow, saleShow, categoryShow, product }) {
    const [productShow, setProductShow] = useState(product);
    const [isPrice, setIsPrice] = useState();
    const [isBrand, setIsBrand] = useState();
    const [isSale, setIsSale] = useState();
    const [isCategory, setIsCategory] = useState();
    const [isStock, setIsStock] = useState();

    const [filterName, setFilterName] = useState(product);
    const [filterBrand, setFilterBrand] = useState(product);
    const [filterPrice, setFilterPrice] = useState(product);
    const [filterSale, setFilterSale] = useState(product);
    const [filterCategory, setFilterCategory] = useState(product);
    const [filterStock, setFilterStock] = useState(product);
    const [drawerOpen, setDrawerOpen] = useState(false); // State to manage the drawer

    const segment = [
        'Dưới 1.000.000',
        'Từ 1.000.000 đến 5.000.000',
        'Từ 5.000.000'
    ];
    const brand = product?.map(e => (e.brand)).filter((value, index, self) => self.indexOf(value) === index);
    const sale = ['Yes', 'No'];
    const stock = ['Còn hàng', 'Hết hàng'];
    const category = product?.map(e => (e.category)).flat().filter((value, index, self) => self.indexOf(value) === index) || [];

    useEffect(() => {
        setProductShow(product);
        setFilterName(product);
        setFilterStock(product);
        setFilterCategory(product);
        setFilterSale(product);
        setFilterPrice(product);
        setFilterBrand(product);
    }, [product]);

    function removeAccents(str) {
        return unidecode(str);
    }

    function removeAllState() {
        setIsPrice(null);
        setIsBrand(null);
        setIsSale(null);
        setIsStock(null);
        setIsCategory(null);

        setFilterBrand(product);
        setFilterStock(product);
        setFilterSale(product);
        setFilterPrice(product);
        setFilterCategory(product);
    }

    function onInputSearch(e) {
        if (e.target.value) {
            const str = removeAccents(e.target.value);
            const arr = product.filter(item => {
                const s = removeAccents(item?.name)?.toLowerCase();
                return s?.includes(str?.toLowerCase().toString());
            });
            setFilterName(arr);
        } else {
            setFilterName(product);
        }
    }

    function searchSegment(e, i) {
        setIsPrice(i);
        switch (i) {
            case 0:
                setFilterPrice(product.filter(e => {
                    return e.price < 1000000;
                }));
                break;
            case 1:
                setFilterPrice(product.filter(e => {
                    return e.price >= 1000000 && e.price < 5000000;
                }));
                break;
            case 2:
                setFilterPrice(product.filter(e => {
                    return e.price >= 5000000;
                }));
                break;
        }
    }

    function searchBrand(e, i) {
        setIsBrand(i);
        setFilterBrand(product.filter(p => {
            return p.brand === e;
        }));
    }

    function searchSale(e, i) {
        setIsSale(i);
        switch (e) {
            case 'Yes':
                setFilterSale(product.filter(p => {
                    return p.sale !== '';
                }));
                break;
            case 'No':
                setFilterSale(product.filter(p => {
                    return p.sale === '';
                }));
                break;
        }
    }

    function searchStock(e, i) {
        setIsStock(i);
        switch (e) {
            case 'Còn hàng':
                setFilterStock(product.filter(p => {
                    return p.stock !== '';
                }));
                break;
            case 'Hết hàng':
                setFilterStock(product.filter(p => {
                    return p.stock === 0;
                }));
                break;
        }
    }

    function searchCategory(e, i) {
        setIsCategory(i);
        const filteredProducts = product.filter(p => p.category.includes(e));
        setFilterCategory(filteredProducts);
    }

    function intersection(arrays) {
        return arrays.reduce((acc, cur) => acc.filter(value => cur.includes(value)));
    }

    function generalSearch() {
        setProductShow(intersection([filterName, filterBrand, filterStock, filterCategory, filterPrice, filterSale]));
    }

    useEffect(() => {
        generalSearch();
    }, [filterName, filterBrand, filterStock, filterCategory, filterPrice, filterSale]);

    const drawerContent = (
        <Box sx={{ width: 250 }} role="presentation">
            <div className="font-medium my-4">
                {priceShow && (
                    <>
                        <h1 className="mb-2">Theo phân khúc</h1>
                        <div className="max-h-[300px] overflow-y-auto">
                            {segment.map((e, i) => (
                                <div key={i}>
                                    <FormControlLabel
                                        value={e}
                                        control={<Radio />}
                                        label={e}
                                        checked={isPrice === i}
                                        onChange={() => searchSegment(e, i)}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {brandShow && (
                    <>
                        <h1 className="mb-2">Theo hãng</h1>
                        <div className="max-h-[300px] overflow-y-auto">
                            {brand.map((e, i) => (
                                <div key={i}>
                                    <FormControlLabel
                                        value={e}
                                        control={<Radio />}
                                        label={e}
                                        checked={isBrand === i}
                                        onChange={() => searchBrand(e, i)}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {saleShow && (
                    <>
                        <h1 className="mb-2">Đang khuyến mãi</h1>
                        <div className="max-h-[300px] overflow-y-auto">
                            {sale.map((e, i) => (
                                <div key={i}>
                                    <FormControlLabel
                                        value={e}
                                        control={<Radio />}
                                        label={e}
                                        checked={isSale === i}
                                        onChange={() => searchSale(e, i)}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {stockShow && (
                    <>
                        <h1 className="mb-2">Số lượng</h1>
                        <div className="max-h-[300px] overflow-y-auto">
                            {stock.map((e, i) => (
                                <div key={i}>
                                    <FormControlLabel
                                        value={e}
                                        control={<Radio />}
                                        label={e}
                                        checked={isStock === i}
                                        onChange={() => searchStock(e, i)}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {categoryShow && (
                    <>
                        <h1 className="mb-2">Loại sản phẩm</h1>
                        <div className="max-h-[300px] overflow-y-auto">
                            {category.map((e, i) => (
                                <div key={i}>
                                    <FormControlLabel
                                        value={e}
                                        control={<Radio />}
                                        label={e}
                                        checked={isCategory === i}
                                        onChange={() => searchCategory(e, i)}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <div className="flex justify-start">
                    <Button variant="outlined" onClick={removeAllState}>
                        Reset
                    </Button>
                </div>
            </div>
        </Box>
    );

    return (
        <div className="mt-20">
            <h1 className="font-bold text-2xl text-center">CÁC MẶT HÀNG</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[17%,83%] mt-6">
                <div className="bg-white w-[95%] p-2">
                    <div className="flex items-center">
                        <h1 className='font-bold text-xl max-lg:hidden '>Bộ lọc</h1>
                        <IconButton onClick={() => setDrawerOpen(true)} className="lg:hidden ml-auto">
                            <MenuIcon className="lg:!hidden scale-100" />
                        </IconButton>
                    </div>
                    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                        {drawerContent}
                    </Drawer>
                    <div className="hidden lg:block">
                        {drawerContent}
                    </div>
                </div>

                <div className="bg-white w-full p-2">
                    <div className="flex items-center relative w-full outline outline-1 outline-gray-400">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên sản phẩm muốn mua"
                            className="p-4 w-full "
                            onChange={onInputSearch}
                        />
                        <div className="absolute top-1/2 right-0 hover:cursor-pointer translate-y-[-50%] mr-4">
                            <SearchIcon className="text-gray-400 " />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                        {productShow.map((e, i) => (
                            <div key={i} className="mr-1 mb-1">
                                <Card product={e} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
