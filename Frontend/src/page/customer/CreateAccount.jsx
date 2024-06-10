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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions.js";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../utils/toastify.js";
import eventEmitter from "../../utils/eventEmitter.js";


function CreateAccount({ register }) {
  const avatar =
    "https://res.cloudinary.com/dlgyapagf/image/upload/v1712984661/TechMarket-User/avatar_default/avatar-default_l2kmh0.jpg";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function registerHandling() {
    const userDetails = {
      name,
      email,
      password,
      phone,
      avatar,
    };

    register(userDetails, navigate);

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
      <div
        className="flex flex-col justify-center items-center w-[40vw] bg-white   shadow-[0px_0px_10px] shadow-gray-500 my-44">
        <div className={"uppercase font-bold text-3xl mt-8"}>TeckMarket</div>
        <div className="px-10  rounded-md  flex flex-col justify-center items-center w-full  mt-10">
          <h1 className="font-medium text-xl mb-6 mt-3">Tạo tài khoản</h1>
          <TextField
            label="Họ và tên"
            className="w-full !my-4 "
            value={name}
            onChange={handleNameChange}
          />
          <div className={"grid grid-cols-2 gap-3 w-full"}>
            <TextField
              label="Email"
              className="w-full !my-4"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              label="Số điện thoại"
              className="w-full !my-4"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          {/* <TextField label="Địa chỉ" className="w-full !my-4" /> */}
          <div className={"grid grid-cols-2 gap-3 w-full"}>
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
            <FormControl variant="outlined" className={"w-full !my-4"}>
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập lại mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
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
                label="Nhập lại mật khẩu"
              />
            </FormControl>
          </div>
          <Link to='/confirmemail' >
            <Button
              variant="contained"
              className={"!my-4"}
              onClick={registerHandling}
            >
              Tạo tài khoản
            </Button>
          </Link>
        </div>
        <div className={'flex justify-end items-center w-full p-6'}><Link to={'/login'} className={'underline hover:text-blue-700 hover:cursor-pointer'}>Trở về trang đăng nhập</Link></div>
      </div>
    </div>
  );
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(CreateAccount);
