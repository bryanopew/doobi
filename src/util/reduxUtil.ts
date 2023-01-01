import { IProduct } from "~/stores/slices/cartSlice";

export const hasProduct = (menu: Array<IProduct>, productNo: string) => {
  const arrOfProductNo = menu.map((product) => product.productNo);
  return arrOfProductNo.includes(productNo);
};

export const getProductIndex = (menu: Array<IProduct>, productNo: string) => {
  let productIndex = 0;
  for (let i = 0; i < menu.length; i++) {
    console.log(i, menu[i].productNo, productNo);
    if (menu[i].productNo == productNo) {
      productIndex = i;
      break;
    }
  }
  return productIndex;
};
