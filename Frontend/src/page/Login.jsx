import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions.js";
import { notify } from "../utils/toastify.js";
import eventEmitter from "../utils/eventEmitter.js";

function Login({ login }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  function loginHandling() {
    const userDetails = {
      email,
      password,
    };

    login(userDetails, navigate);
  }
  useEffect(() => {
    const handleSuccess = () => {
      notify('success', 'Đăng nhập thành công');
    };
    const handleError = (error) => {
      notify('error', error);
    };

    eventEmitter.on('success', handleSuccess);
    eventEmitter.on('error', handleError);

    return () => {
      eventEmitter.off('success', handleSuccess);
      eventEmitter.off('error', handleError);
    };
  }, []);
  return (
    <div className={" w-full h-[100vh] flex justify-center items-center"}>
      <div className="flex flex-col justify-center items-center w-[36vw] bg-white  shadow-[0px_0px_10px] shadow-gray-500 ">
        <div className={"uppercase font-bold text-3xl mt-8"}>TeckMarket</div>
        <div className="px-10 pb-5 rounded-md  flex flex-col justify-center items-center w-full mt-10 ">
          <h1 className="font-medium text-xl mb-6 mt-3">Đăng nhập</h1>
          <TextField
            label="Email"
            className="w-full !my-4"
            value={email}
            onChange={handleEmailChange}
          />
          <FormControl variant="outlined" className={"w-full !my-4"}>
            <InputLabel htmlFor="outlined-adornment-password">
              Mật khẩu
            </InputLabel>
            <OutlinedInput
              value={password}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
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
          <Button
            variant="contained"
            className={"!my-4"}
            onClick={loginHandling}
          >
            Đăng nhập
          </Button>
          <div
            className={
              "flex items-center justify-between w-full mb-6 hover:cursor-pointer"
            }
          >
            <a
              href={"/createAccount"}
              className={"underline text-md font-medium hover:text-blue-600"}
            >
              Đăng ký tài khoản
            </a>
            <div
              className={"underline text-md font-medium  hover:text-blue-600"} onClick={() => {
                navigate('/forgotpassword')
              }}
            >
              Quên mật khẩu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Login);
