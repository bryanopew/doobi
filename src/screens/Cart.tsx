import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "@react-native-community/checkbox";

import { RootState } from "~/stores/store";
import { View, ScrollView, TouchableOpacity } from "react-native";
import colors from "~/styles/colors";
import { SCREENWIDTH } from "~/constants/constants";
import { BASE_URL } from "~/query/urls";
import {
  pickProductCheckBox,
  deleteProduct,
  checkBoxDeleteProduct,
} from "~/stores/slices/cartSlice";

import {
  BtnCTA,
  BtnText,
  BtnBottomCTA,
  Col,
  Container,
  HorizontalLine,
  HorizontalSpace,
  TextMain,
  TextSub,
} from "~/styles/styledConsts";

import NutrientsProgress from "~/components/common/NutrientsProgress";
import MenuHeader from "~/components/common/MenuHeader";
import CartMenuHeader from "~/components/cart/CartMenuHeader";
import MenuSelect from "~/components/common/MenuSelect";
import CartMenuSelect from "~/components/cart/CartMenuSelect";
import EmptyCart from "~/components/cart/EmptyCart";
import ExistCart from "~/components/cart/ExistCart";
import CardMenuSelect from "~/components/cart/CardMenuSelect";

const Row = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;
const CartContainer = styled(Container)`
  width: 344px;
  margin-left: 8px;
  border-radius: 5px;
`;

const CheckBoxText = styled(TextMain)`
  font-size: 14px;
`;
const DeleteSelect = styled(TextMain)`
  padding: 3px;
  font-size: 14px;
  margin-left: 183px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${colors.white};
  background-color: ${colors.white};
`;
const TotalPriceText = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;
const SummaryText = styled(TextMain)`
  margin-top: 4px;
  font-size: 14px;
`;
const Price = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;
const Nutr = styled.View`
  margin-top: 20px;
  align-items: flex-end;
  padding-bottom: 20px;
`;
const Helper = styled.View`
  margin-top: 80px;
`;

const PickMenu = styled.TouchableOpacity`
  margin-left: 10px;
  margin-top: 20px;
  // align-self: flex-start;
  // /* background-color: ${colors.highlight}; */
`;

const CheckAll = (props) => {
  const [clicked, setClicked] = useState(false);
  return (
    <View>
      <CheckBox
        value={clicked}
        onValueChange={(value) => {
          setClicked(value), console.log("전체 선택");
        }}
        tintColors={{ true: "#30D158" }}
      />
    </View>
  );
};
const Cart = () => {
  const { cart, menuIndex, pickedCart } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  const [menuSelectOpen, setMenuSelectOpen] = useState(false);
  const [checkAllClicked, setCheckAllClicked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const checkPrice = () =>
    cart[menuIndex].length === 0 ? setTotalPrice(0) : totalPrice;
  useEffect(() => {
    checkPrice();
  }, [cart[menuIndex].length]);
  const menuInfo = (arg) =>
    arg.map((el, index) => {
      return `끼니 ${index + 1}`;
    });
  let cardMenuArray = menuInfo(cart).map((el) => {
    return el;
  });
  const getPlatformNm = () =>
    cart[0].map((el, index) => {
      return el.platformNm;
    });
  const set = new Set(getPlatformNm());
  const platformArray = [...set];

  //결제정보 관련
  const getProductInfo = (index: number) =>
    cart[index]?.map((el) => {
      return {
        cartIndex: index,
        productNo: el.productNo,
        qty: el.qty,
        price: el.price,
      };
    });
  let productInfoArray = [];
  for (let i = 0; i < 3; i++) {
    productInfoArray.push(getProductInfo(i));
  }
  // console.log("cart/pickedCart:", pickedCart);
  // console.log("cart/cartArray:", cart);
  const checkEvery = () => {};
  return (
    <>
      <ScrollView>
        <Row>
          <CheckAll check={setCheckAllClicked} />
          <CheckBoxText>전체 선택</CheckBoxText>
          <TouchableOpacity
            onPress={() => {
              dispatch(checkBoxDeleteProduct({ menuIndex, pickedCart }));
            }}
          >
            <DeleteSelect>선택 삭제</DeleteSelect>
          </TouchableOpacity>
        </Row>
        <CartContainer>
          <CartMenuHeader
            menuSelectOpen={menuSelectOpen}
            setMenuSelectOpen={setMenuSelectOpen}
          />
          <NutrientsProgress menuIndex={menuIndex} />
          {cart[menuIndex].length === 0 ? (
            <EmptyCart />
          ) : (
            <ExistCart totalPrice={setTotalPrice} />
          )}

          <Nutr>
            <TotalPriceText>합계 {totalPrice}원</TotalPriceText>
          </Nutr>
          {menuSelectOpen && <CartMenuSelect setOpen={setMenuSelectOpen} />}
        </CartContainer>
        <Row>
          <CardMenuSelect />
        </Row>
        <SummaryText>
          {/* {cardMenuArray.map((el, index) => {
            return <SummaryText key={index}>+{el}</SummaryText>;
          })} */}
        </SummaryText>
      </ScrollView>

      <Helper>
        <BtnBottomCTA
          btnStyle={cart[menuIndex].length === 0 ? "inactivated" : "activated"}
          disabled={cart[menuIndex].length === 0 ? true : false}
          onPress={() => console.log(productInfoArray)}
        >
          <BtnText>총 {totalPrice}원 주문하기</BtnText>
        </BtnBottomCTA>
      </Helper>
    </>
  );
};

export default Cart;
