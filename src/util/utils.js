import banner1 from '../assets/img/bangsong.png';
import banner2 from '../assets/img/radio.png';
import banner3 from '../assets/img/banner3.png';
import { toast } from 'react-toastify';

export const getBannerImg = (bannerId) => { 
  switch(bannerId) {
    case 1 :
      return banner1;
    case 2 :
      return banner2;
    case 3 :
      return banner3;
    default :
      return null;
  }
}

export const dateFormat = (date) => {
  let dateFormated =
    date.getFullYear() +
    "/" +
    (date.getMonth() + 1 < 9
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "/" +
    (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate());

  return dateFormated;
};

export const notifySuccess = (txt) => {
  toast.success(txt, {
    autoClose: 1500,
    position: "top-center",
    hideProgressBar: true,
    pauseOnHover: false,
    theme: "colored",
  });
};

export const notifyError = (txt) => {
  toast.error(txt, {
    autoClose: 1500,
    position: "top-center",
    hideProgressBar: true,
    pauseOnHover: false,
    theme: "colored",
  });
};