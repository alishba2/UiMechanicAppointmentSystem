import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifySuccess = (message, time) => {
    toast.success(message, {
      position: "top-right",
      autoClose: time,
    });
  };

  const notifyError = (message, time) => {
    toast.error(message, {
      position: "top-right",
      autoClose: time,
    });
  };

export {
    notifySuccess,
    notifyError
}