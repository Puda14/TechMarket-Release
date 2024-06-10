import TextField from "@mui/material/TextField";
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import eventEmitter from "../../utils/eventEmitter.js";
import {notify} from "../../utils/toastify.js";
import {userApi} from "../../../api/userApi.js";


export default function ForgotPassword({register}) {

    const navigate = useNavigate();
    const [send, setSend] = useState(false)
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailChangeRequest = async () => {
        try {
            const res = await userApi.forgotPassword(email)
            if (res.data.status === 'success') {
                notify('success', 'Đã gửi mật khẩu mới, Vui lòng kiểm tra email!')
            } else notify('error', 'Có lỗi xảy ra!')
            setSend(true)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className={" w-full h-[100vh] flex justify-center items-center"}>
            <div
                className="flex flex-col justify-center items-center w-[40vw] bg-white   shadow-[0px_0px_10px] shadow-gray-500 my-44">
                <div className={"uppercase font-bold text-3xl mt-8"}>TeckMarket</div>
                <div className="px-10  rounded-md  flex flex-col justify-center items-center w-full  mt-10">
                    <h1 className="font-medium text-xl mb-6 mt-3">Quên mật khẩu</h1>
                    <div className={"grid grid-cols-[80%,20%] gap-3 w-full"}>
                        <TextField
                            label="Email"
                            className="w-full !my-4"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <Button
                            variant="contained"
                            className={"!my-4"}
                            onClick={handleEmailChangeRequest}
                            disabled={send}
                        >
                            Gửi
                        </Button>
                    </div>
                    <div className={'flex justify-end items-center w-full p-6'}><Link to={'/login'}
                                                                                      className={'underline hover:text-blue-700 hover:cursor-pointer'}>Trở
                        về trang đăng nhập</Link></div>
                </div>
            </div>
        </div>
    );
}