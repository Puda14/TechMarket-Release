import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

export  const notify = (status, msg)=> {
    const options = {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    };

     switch (status) {
        case "info":
            toast.info(msg, options);
            break;
        case "success":
            toast.success(msg, options);
            break;
        case "warn":
            toast.warn(msg, options);
            break;
        case "error":
            toast.error(msg, options);
            break;
        default:
            toast(msg, options);
            break;
    }
}
