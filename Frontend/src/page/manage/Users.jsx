import React, { useEffect, useState } from 'react';
import {
    Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Select, MenuItem,
    InputLabel, FormControl, InputAdornment, IconButton, OutlinedInput
} from "@mui/material";
import { userApi } from "../../../api/userApi.js";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { notify } from "../../utils/toastify.js";
import { jwtDecode } from "jwt-decode";

function Users() {
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [phoneFilter, setPhoneFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [open, setOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: '',
        avatar: ''
    });
    const [editUser, setEditUser] = useState({ name: '', email: '', password: '', phone: '', address: '', role: '' });
    const [page, setPage] = useState(1);
    const usersPerPage = 5;

    const fetch = async () => {
        try {
            const res = await userApi.getAllUsers();
            setAllUsers(res.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEmailFilterChange = (event) => {
        setEmailFilter(event.target.value);
    };

    const handlePhoneFilterChange = (event) => {
        setPhoneFilter(event.target.value);
    };

    const handleRoleFilterChange = (event) => {
        setRoleFilter(event.target.value);
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await userApi.deleteUser(selectedUserId);
        } catch (error) {
            console.error("Error deleting user:", error);
        } finally {
            setIsLoading(false);
            fetch();
            setOpen(false);
        }
    };

    const handleOpen = (userId) => {
        setSelectedUserId(userId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleCreateUserOpen = () => {
        setCreateModalOpen(true);
    };

    const handleCreateUserClose = () => {
        setCreateModalOpen(false);
    };

    const handleEditUserOpen = (user) => {
        // const decodedUser = jwtDecode(user.token);
        setEditUser(user);
        setEditModalOpen(true);
    };

    const handleEditUserClose = () => {
        setEditModalOpen(false);
    };

    const handleCreateUserChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleEditUserChange = (event) => {
        const { name, value } = event.target;
        setEditUser({ ...editUser, [name]: value });
    };

    const handleCreateUser = async () => {
        try {
            setIsLoading(true);
            const res = await userApi.createUser(newUser);
            fetch();
            if (res?.data?.data) {
                notify('success', 'Tạo tài khoản thành công');
            } else {
                notify('error', res.response.data.error);
            }
            setCreateModalOpen(false);
        } catch (error) {
            notify('error', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditUser = async () => {
        try {
            setIsLoading(true);
            const res = await userApi.updateUser(editUser, editUser._id);
            fetch();
            if (res?.data?.data) {
                notify('success', 'Thay đổi thông tin thành công!');
            } else {
                notify('error', res.response.data.error);
            }
            setEditModalOpen(false);
        } catch (error) {
            console.error("Error editing user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole, user) => {
        try {
            setIsLoading(true);
            console.log({
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                role: newRole,
            })
            await userApi.updateUser({
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                role: newRole,
            }, userId);
            fetch();
        } catch (error) {
            console.error("Error updating user role:", error);
        } finally {
            setIsLoading(false);
        }
    };



    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
        user.phone.includes(phoneFilter) &&
        user.role.toLowerCase().includes(roleFilter.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <h1 className="text-lg font-bold uppercase">Tất cả người dùng</h1>
            <div className={'grid grid-cols-[75%,25%] my-6'}>
                <div className={'flex gap-x-4 items-center '}>
                    <TextField
                        label="Tìm kiếm theo tên"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        className={'bg-white'}
                    />
                    <TextField
                        type="text"
                        label="Lọc theo email"
                        value={emailFilter}
                        onChange={handleEmailFilterChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        className={'bg-white'}
                    />
                    <TextField
                        type="text"
                        label="Lọc theo số điện thoại"
                        value={phoneFilter}
                        onChange={handlePhoneFilterChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        className={'bg-white'}
                    />
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Vai trò</InputLabel>
                        <Select
                            value={roleFilter}
                            onChange={handleRoleFilterChange}
                            label="Vai trò"
                            className={'bg-white'}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="customer">Customer</MenuItem>
                            <MenuItem value="employee">Employee</MenuItem>
                            <MenuItem value="manager">Manager</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={' flex justify-end items-center'}>
                    <Button variant="contained" color="primary" onClick={handleCreateUserOpen} size={'large'}
                        startIcon={<PersonAddAltIcon />}>Thêm mới</Button>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Vai trò</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.length ? paginatedUsers.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell>{(page - 1) * usersPerPage + index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>
                                    <Select
                                        value={user.role}
                                        onChange={(e) => {
                                            console.log(user._id, e.target.value, user)
                                            handleRoleChange(user._id, e.target.value, user)
                                        }}
                                    >
                                        <MenuItem value="customer">Customer</MenuItem>
                                        <MenuItem value="employee">Employee</MenuItem>
                                        <MenuItem value="manager">Manager</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" className={'!mr-2'}
                                        onClick={() => handleEditUserOpen(user)}>Sửa</Button>
                                    <Button variant="contained" color="error"
                                        onClick={() => handleOpen(user._id)}>Xoá</Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Không có dữ liệu</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={'flex items-center justify-end'}>
                <Pagination
                    count={Math.ceil(filteredUsers.length / usersPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    className="mt-4 "
                />
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa người dùng này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={handleDelete} color="error" autoFocus disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : 'Xoá'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={createModalOpen} onClose={handleCreateUserClose}>
                <DialogTitle>Tạo người dùng mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Tên"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newUser.name}
                        onChange={handleCreateUserChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={newUser.email}
                        onChange={handleCreateUserChange}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={newUser.password}
                        onChange={handleCreateUserChange}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Số điện thoại"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newUser.phone}
                        onChange={handleCreateUserChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Địa chỉ"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newUser.address}
                        onChange={handleCreateUserChange}
                    />
                    <FormControl fullWidth variant="outlined" margin="dense">
                        <InputLabel>Vai trò</InputLabel>
                        <Select
                            name="role"
                            value={newUser.role}
                            onChange={handleCreateUserChange}
                            label="Vai trò"
                        >
                            <MenuItem value="customer">Customer</MenuItem>
                            <MenuItem value="employee">Employee</MenuItem>
                            <MenuItem value="manager">Manager</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateUserClose} color="primary">Hủy</Button>
                    <Button onClick={handleCreateUser} color="primary" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : 'Tạo'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editModalOpen} onClose={handleEditUserClose}>
                <DialogTitle>Sửa thông tin người dùng</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Tên"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editUser.name}
                        onChange={handleEditUserChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={editUser.email}
                        onChange={handleEditUserChange}
                        autoComplete={'off'}
                    />
                    {/*<TextField*/}
                    {/*    margin="dense"*/}
                    {/*    name="password"*/}
                    {/*    label="Mật khẩu"*/}
                    {/*    type={'password'}*/}
                    {/*    fullWidth*/}
                    {/*    variant="outlined"*/}
                    {/*    value={editUser.password}*/}
                    {/*    onChange={handleEditUserChange}*/}
                    {/*/>*/}
                    <FormControl sx={{marginY: 1,  width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            // value={editUser.password}
                            onChange={handleEditUserChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Mật khẩu"
                        />
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Số điện thoại"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editUser.phone}
                        onChange={handleEditUserChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Địa chỉ"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editUser.address}
                        onChange={handleEditUserChange}
                    />
                    <FormControl fullWidth variant="outlined" margin="dense">
                        <InputLabel>Vai trò</InputLabel>
                        <Select
                            name="role"
                            value={editUser.role}
                            onChange={handleEditUserChange}
                            label="Vai trò"
                        >
                            <MenuItem value="customer">Customer</MenuItem>
                            <MenuItem value="employee">Employee</MenuItem>
                            <MenuItem value="manager">Manager</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditUserClose} color="primary">Hủy</Button>
                    <Button onClick={handleEditUser} color="primary" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : 'Lưu'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Users;
