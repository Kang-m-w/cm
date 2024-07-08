import banner1 from '../assets/img/bangsong.png';
import banner2 from '../assets/img/radio.png';

export const getBannerImg = (bannerId) => { 
  switch(bannerId) {
    case 1 :
      return banner1;
    case 2 :
      return banner2;
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
    (date.getDate() < 9 ? "0" + date.getDate() : date.getDate());

  return dateFormated;
};