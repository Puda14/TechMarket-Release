import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { connect, useDispatch, useSelector } from "react-redux";
import { getActions, logout } from "../store/actions/authActions.js";
import { deleteAll, getCart } from "../store/actions/cartAction.js";
import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { productApi } from "../../api/productApi.js";
import eventEmitter from "../utils/eventEmitter.js";
import InfoModal from "./InfoModal.jsx";

function Navbar({ userDetails }) {
    const product = useSelector(state => state.products.data)
    const userID = JSON.parse(localStorage.getItem('session'))?.userDetails?._id
    const dispatch = useDispatch()
    const { isLoggedIn } = JSON.parse(localStorage.getItem('session')) || { isLoggedIn: false }
    const cart = useSelector(state => state.cart.data)
    const category = product?.map(e => (e.category)).flat().filter((value, index, self) => self.indexOf(value) === index) || []
    const [isHover, setIsHover] = useState(false);
    const categoryArr = category?.filter((e, i) => {
        return i < 5;
    });
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    function logoutX() {
        dispatch(logout())
        dispatch(deleteAll())
        localStorage.removeItem('session');
    }
    const fetchData = async (id) => {
        try {
            const res = await productApi.getUserCart(id);
            const cartData = product.filter((item) => res.data.includes(item._id)).map(e => ({
                ...e,
                quantity: 0,
                checked: false
            }));
            dispatch(getCart(cartData))
        } catch (error) {
            console.error('Error fetching user cart:', error);
        }
    };
    useEffect(() => {
        if (userID) {
            fetchData(userID);
        }
    }, [product, userID]);
    useEffect(() => {
        const update = () => {
            fetchData(userID);
        }
        eventEmitter.on('updateCart', update)
        return () => {
            eventEmitter.removeListener('updateCart', update)
        }
    }, [])


    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>

            <List>
                <ListItem className={'uppercase font-bold text-lg '}>
                    Danh mục sản phẩm
                </ListItem>
                <Divider />
                <div className={'p-4'}>
                    {category.map((text, i) => (
                        <Link
                            to={`/category/${text}`} key={i}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}

                </div>
            </List>
        </Box>
    );
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlHeader = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlHeader);
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY]);

    return (
        <div className={`fixed flex bg-[#231f20] right-0 left-0 top-0 z-20 h-[80px] text-white items-center justify-between transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
            }`}>
            <div className="flex items-center">
                <div className="hidden max-lg:block ml-8 hover:scale-125">
                    <div onClick={toggleDrawer(true)} className={""}><MenuIcon /></div>
                </div>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
                <a
                    href={"/"}
                    className="font-extrabold text-2xl ml-16 p-3  hover:bg-white  hover:text-black max-lg:ml-3"
                >
                    TECH MARKET
                </a>

                <div className=" ml-[160px] flex items-center max-lg:hidden ">
                    <div
                        className={`p-6 font-bold text-xl relative hover:scale-110  `}
                        onMouseOver={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                    >
                        TẤT CẢ
                        <div
                            className={`absolute bg-white   ${isHover ? "block" : "hidden"
                                }  grid grid-rows-4 grid-flow-col -translate-x-1/2  left-1/2  top-[60px]   shadow-[0px_0px_20px] shadow-gray-500 `}
                        >
                            {category.map((e, i) => (
                                <Link
                                    to={`/category/${e}`}
                                    key={i}
                                    className={
                                        "text-black font-medium text-[12px] text-center hover:bg-[#231f20] hover:text-white  p-2 w-24 line-clamp-1"
                                    }
                                >
                                    {e}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            {categoryArr?.map((e, i) => (
                                <Link
                                    to={`/category/${e}`}
                                    key={i}
                                    className={`mx-2 font-medium p-4 hover:scale-110 ${i > 3 ? 'max-2xl:hidden' : ''} ${i > 1 ? 'max-xl:hidden' : ''} max-lg:hidden `}
                                >
                                    {e}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center mr-16  ">
                <Link to={"/cart"} className="indicator mx-8 hover:scale-110 ">
                    <ShoppingCartIcon className={"!text-3xl"} />
                    <span className="badge badge-sm indicator-item">{cart.length}</span>
                </Link>

                <div className="dropdown dropdown-end ">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar "
                    >
                        <FaRegUser className={"text-3xl"} />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content  z-[1]   bg-white  w-52 text-black  shadow-[0px_0px_20px] shadow-gray-500 !p-0 "
                    >
                        {!isLoggedIn ? (
                            <li>
                                <Link
                                    to={"/login"}
                                    className={
                                        "!rounded-none text-black font-medium text-[12px] text-center hover:!bg-[#231f20] hover:!text-white  p-2  "
                                    }
                                >
                                    Đăng nhập
                                </Link>
                            </li>
                        ) : (
                            <div>
                                <li>
                                    <div
                                        className={
                                            "!rounded-none text-black font-medium text-[12px] text-center hover:!bg-[#231f20] hover:!text-white  p-2   "
                                        }
                                    >
                                        <InfoModal/>

                                    </div>
                                </li>
                                <li>
                                    <Link
                                        to={"/orderstatus"}
                                        className={
                                            "!rounded-none text-black font-medium text-[12px] text-center hover:!bg-[#231f20] hover:!text-white  p-2   "
                                        }
                                    >
                                        Đơn hàng của bạn
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="/"
                                        onClick={logoutX}
                                        className={
                                            "!rounded-none text-black font-medium text-[12px] text-center hover:!bg-[#231f20] hover:!text-white  p-2  "
                                        }
                                    >
                                        Đăng xuất
                                    </a>
                                </li>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const mapStoreStateToProps = ({ auth, dispatch }) => {
    return {
        ...auth,
        ...getActions(dispatch),

    };
};

export default connect(mapStoreStateToProps)(Navbar);
