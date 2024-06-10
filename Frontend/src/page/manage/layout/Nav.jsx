import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ChatIcon from '@mui/icons-material/Chat';

function Nav() {
    const location = useLocation();
    const session = JSON.parse(localStorage.getItem('session')) || { isLoggedIn: false, userDetails: {} };
    const { userDetails } = session;
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const { role } = userDetails;
        const items = getMenuItemsByRole(role);
        setMenuItems(items);
    }, []);

    const getMenuItemsByRole = (role) => {
        if (role === 'employee') {
            return [
                { title: 'Sản phẩm đăng bán', icon: <CategoryIcon />, path: '/managehome/products' },
                { title: 'Quản lý đơn hàng', icon: <FactCheckIcon />, path: '/managehome/managestatusproduct' },
                { title: 'Nhắn tin với khách hàng', icon: <ChatIcon />, path: '/managehome/chat' },

            ];
        } else {
            return [
                { title: 'Thống kê', icon: <DashboardIcon />, path: '/managehome/dashboard' },
                { title: 'Quản lý tài khoản', icon: <PersonIcon />, path: '/managehome/users' },
                { title: 'Sản phẩm đăng bán', icon: <CategoryIcon />, path: '/managehome/products' },
                { title: 'Quản lý đơn hàng', icon: <FactCheckIcon />, path: '/managehome/managestatusproduct' },
            ];
        }
    };

    return (
        <div>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        className={`${location.pathname === item.path ? 'bg-[#F4F4F4]' : ''}`}
                    >
                        <ListItemButton component={Link} to={item.path}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Nav;
