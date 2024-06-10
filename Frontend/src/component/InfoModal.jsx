import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PersonIcon from "@mui/icons-material/Person.js";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone.js";
import EmailIcon from "@mui/icons-material/Email.js";
import HomeIcon from "@mui/icons-material/Home.js";
import {useEffect, useState} from "react";
import {userApi} from "../../api/userApi.js";
import TextField from "@mui/material/TextField";
import {notify} from "../utils/toastify.js";
import eventEmitter from "../utils/eventEmitter.js";
import KeyIcon from '@mui/icons-material/Key';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

export default function InfoModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {userDetails} = JSON.parse(localStorage.getItem('session'))
    const [infor, setInfor] = useState({});
    const [isUpdate, setIsUpdate] = useState(false)
    const [isUpdatePass, setIsUpdatePass] = useState(false)
    const [updateData, setUpdateData] = useState({})
    const fetchData = async (userId) => {
        try {
            const res = await userApi.getUserById(userId);
            setInfor(res.data.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    useEffect(() => {
        fetchData(userDetails._id);
    }, [open]);
    const handleUpdate = async () => {
        setIsUpdate(e => {
            return !e
        })
        if (isUpdate) {
            await userApi.updateUser(updateData, userDetails._id)
            await fetchData(userDetails._id);
            eventEmitter.emit('updateInforCurrentUser')
            notify('success', 'Cập nhật thông tin thành công!')
        }
    }

    function handleInput(e) {
        const {name, value} = e.target;
        setUpdateData({...updateData, [name]: value});
    }

  async  function handleUpdatePassword() {
        setIsUpdatePass(() => {
            return !isUpdatePass
        })
try {
    const res = await userApi.updateUser(updateData,userDetails._id )
    console.log(updateData)
    await fetchData(userDetails._id);
    eventEmitter.emit('updateInforCurrentUser')
    notify('success', 'Cập nhật mật khẩu thành công!')
}catch (e){
    console.log(e)
}

    }

    return (
        <div>
            <p onClick={handleOpen}>Thông tin tài khoản</p>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thông tin cá nhân của bạn
                    </Typography>
                    <div id="modal-modal-description">
                        <div className={`p-8 ${!isUpdatePass? ' ': ' hidden'}  ${isUpdate ? ' hidden' : ' '}`}>
                            <div className={'flex flex-col gap-3'}>
                                <div className={'flex gap-3 items-center'}>
                                    <div>
                                        <PersonIcon/>
                                    </div>
                                    <div>
                                        <div className={'text-[#8F90A6]'}>Tên</div>
                                        <div className={' text-[#1C1C28]'}>{infor?.name}</div>
                                    </div>
                                </div>
                                <div className={'flex gap-3 items-center'}>
                                    <div>
                                        <PhoneIphoneIcon/>
                                    </div>
                                    <div>
                                        <div className={'text-[#8F90A6]'}>Số điện thoại</div>
                                        <div className={' text-[#1C1C28]'}>{infor?.phone}</div>
                                    </div>
                                </div>

                                {/*<div className={'flex gap-3 items-center'}>*/}
                                {/*    <div>*/}
                                {/*        <ManIcon />*/}
                                {/*    </div>*/}
                                {/*    <div>*/}
                                {/*        <div className={'text-[#8F90A6]'}>Giới tính</div>*/}
                                {/*        <div className={'text-[#1C1C28]'}>{infor?.gender}</div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div className={'flex gap-3 items-center'}>
                                    <div>
                                        <EmailIcon/>
                                    </div>
                                    <div>
                                        <div className={'text-[#8F90A6]'}>Email</div>
                                        <div className={'text-[#1C1C28]'}>{infor?.email}</div>
                                    </div>
                                </div>

                                <div className={'flex gap-3 items-center'}>
                                    <div>
                                        <HomeIcon/>
                                    </div>
                                    <div>
                                        <div className={'text-[#8F90A6]'}>Địa chỉ</div>
                                        <div className={'text-[#1C1C28]'}>{infor?.address}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`p-8   ${isUpdate ? ' ' : ' hidden'}`}>
                            <div className={'flex flex-col gap-3'}>
                                <div className={'flex gap-3 items-center'}>
                                    <div>
                                        <PersonIcon/>
                                    </div>
                                    <div className={'w-full'}>
                                        <TextField className={'w-full'} name={'name'} label="Tên" variant="outlined"
                                                   size={'small'} value={updateData?.name || infor?.name}
                                                   onChange={handleInput}/>
                                    </div>
                                </div>
                                <div className={'flex gap-3 items-center'}>
                                    <div>
                                        <PhoneIphoneIcon/>
                                    </div>
                                    <div className={'w-full'}>
                                        <TextField className={'w-full'} name={'phone'} label="Số điện thoại"
                                                   variant="outlined" size={'small'}
                                                   value={updateData?.phone || infor?.phone} onChange={handleInput}/>
                                    </div>
                                </div>

                                {/*<div className={'flex gap-3 items-center'}>*/}
                                {/*    <div>*/}
                                {/*        <ManIcon />*/}
                                {/*    </div>*/}
                                {/*    <div>*/}
                                {/*        <div className={'text-[#8F90A6]'}>Giới tính</div>*/}
                                {/*        <div className={'text-[#1C1C28]'}>{infor?.gender}</div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div className={'flex gap-3 items-center'}>
                                    <div>
                                        <EmailIcon/>
                                    </div>
                                    <div className={'w-full'}>
                                        <TextField className={'w-full'} name={'email'} label="Email" variant="outlined"
                                                   size={'small'} value={updateData?.email || infor?.email}
                                                   onChange={handleInput}/>
                                    </div>
                                </div>

                                <div className={'flex gap-3 items-center'}>
                                    <div>
                                        <HomeIcon/>
                                    </div>
                                    <div className={'w-full'}>
                                        <TextField className={'w-full'} name={'address'} label="Địa chỉ"
                                                   variant="outlined" size={'small'}
                                                   value={updateData?.address || infor?.address}
                                                   onChange={handleInput}/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`flex gap-3 my-10 items-center ${isUpdatePass? ' ': ' hidden'}`}>
                            <div>
                                <KeyIcon/>
                            </div>
                            <div className={'w-full'}>
                                <TextField className={'w-full'} name={'password'} label="Mật khẩu mới"
                                           variant="outlined" size={'small'}
                                           value={updateData?.password || ''}
                                           onChange={handleInput}/>
                            </div>
                        </div>
                    </div>
                    <div className={'w-full grid grid-cols-2 '}>
                      <div className={' w-full flex justify-start'}>
                          <Button variant={'contained'} color={isUpdatePass ? 'error' : 'info'}
                                  className={`  ${isUpdate ? ' !hidden' : ' '}        `}
                                  onClick={handleUpdatePassword}>{!isUpdatePass ? 'Đổi mật khẩu' : 'Lưu'}
                          </Button>
                      </div>
                       <div className={' w-full flex justify-end'}>
                           <Button variant={'contained'} color={!isUpdate ? 'error' : 'info'}
                                   className={`  ${!isUpdatePass? '   ': '  !hidden'}`}
                                   onClick={handleUpdate}>{!isUpdate ? 'Chỉnh sửa' : 'Lưu'}
                           </Button>
                       </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}