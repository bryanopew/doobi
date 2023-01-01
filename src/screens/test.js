const obj = {
  productNm: "존맛식품 맛있는 닭가슴살",
  calorie: "250",
  carb: "10",
  protein: "25",
  fat: "7",
};

obj;

const obj2 = {
  cart: {
    menu1: {
      PD125: {
        productNm: "존맛식품 맛있는 닭가슴살",
        calorie: "250",
        carb: "10",
        protein: "25",
        fat: "7",
      },
    },
  },
};

const key = "key1";

const obj3 = {
  [key]: "value1",
};
console.log(obj3);
