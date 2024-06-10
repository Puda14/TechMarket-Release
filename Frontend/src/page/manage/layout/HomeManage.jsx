import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import logo_page from ''
import {Link, Outlet, Route, Routes} from "react-router-dom";
import Nav from "./Nav.jsx";
import {Avatar, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import InfoModal from "../../../component/InfoModal.jsx";
import {userApi} from "../../../../api/userApi.js";
import {useEffect, useState} from "react";
import eventEmitter from "../../../utils/eventEmitter.js";

const drawerWidth = 240;
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'center',
}));
const settings = ['Tài khoản', 'Đăng xuất'];

function HomeManage() {
    const [open, setOpen] = React.useState(true);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {userDetails} = JSON.parse(localStorage.getItem('session'))
    const [infor, setInfor] = useState({});
    const fetchData = async (userId) => {
        try {
            const res = await userApi.getUserById(userId);
            setInfor(res.data.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        fetchData(userDetails._id);
    }, []);
    useEffect(() => {
        const refresh = async ()=>{
          await  fetchData(userDetails._id);
        }
        eventEmitter.on('updateInforCurrentUser',refresh)
        return ()=>{
            eventEmitter.removeListener('updateInforCurrentUser',refresh)
        }
    }, []);
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open} className={'!bg-white !shadow-[0px_0px_20px] !shadow-gray-300'}>
                <Toolbar className={'flex items-center justify-between'}>
                    <IconButton
                        color="info"
                        aria-label="open drawer"
                        onClick={!open ? handleDrawerOpen : handleDrawerClose}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'flex'}), height: '50px', width: '50px'}}
                        className={'justify-center items-center'}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box className={'flex items-center justify-start'}>
                        <div className={'text-black mr-4'}>
                            <p className={'font-bold'}>{infor?.name}</p>
                            <div>{infor?.role === 'employee' ?
                                <p className={' uppercase py-[2px] font-medium text-[10px] bg-green-300 text-center rounded-full '}>{infor?.role}</p> :
                                <p className={' uppercase py-[2px] font-medium text-[10px] bg-yellow-300 text-center rounded-full '}>{infor?.role}</p>}
                            </div>
                        </div>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar  {...stringAvatar(infor?.name||'Bùi Đăng Đức')}/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem>
                                {/*<Typography textAlign="center" className={'!px-4'}>Tài khoản</Typography>*/}
                                <InfoModal/>
                            </MenuItem>
                            <MenuItem>
                                <Link to={'/login'}>
                                    <Typography textAlign="start" className={''}>Đăng xuất</Typography>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
                className={'!outline-0 !border-0 !bg-red-400'}
            >
                <DrawerHeader>
                    <a href={'/'} className={'flex items-center justify-center hover:cursor-pointer'}>
                       <p className={' uppercase text-2xl font-bold  px-4 py-2 hover:bg-black hover:text-white '}>TECH MARKET</p>
                    </a>
                </DrawerHeader>
                <Divider/>
                <Nav/>
            </Drawer>
            <Main open={open} className={'!bg-[#F4F4F4]'}>
                <DrawerHeader/>
                <Outlet/>
            </Main>
        </Box>
    );
}

export default HomeManage;