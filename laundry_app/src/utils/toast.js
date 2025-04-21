import { toast } from 'react-toastify';
 
const toastTypes = ['success', 'error', 'info', 'warning', 'default'];
 
export const showToast = (message, type = 'success') => {
  console.log("TOAST CALLED:", message, type);
 
  // Fallback to 'default' if type is invalid
  const toastType = toastTypes.includes(type) ? type : 'default';
 
  toast[toastType](message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};