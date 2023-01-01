import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "@react-native-community/checkbox";

import { RootState } from "~/stores/store";
import { View, ScrollView, TouchableOpacity } from "react-native";
import colors from "~/styles/colors";
import { SCREENWIDTH } from "~/constants/constants";
import { BASE_URL } from "~/query/urls";
import { pickProductCheckBox, deleteProduct } from "~/stores/slices/cartSlice";

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
const ProductName = styled(TextMain)`
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
        onValueChange={(value) => setClicked(value)}
        tintColors={{ true: "#30D158" }}
      />
    </View>
  );
};
const Cart = () => {
  const { cart, menuIndex } = useSelector((state: RootState) => state.cart);
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
      return `식단 ${index + 1}`;
    });

  let cardMenuArray = menuInfo(cart).map((el) => {
    return el;
  });

  return (
    <>
      <ScrollView>
        <Row>
          <CheckAll check={setCheckAllClicked} />
          <CheckBoxText>전체 선택</CheckBoxText>
          <TouchableOpacity>
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
      </ScrollView>

      <Helper>
        <BtnBottomCTA
          btnStyle={cart[menuIndex].length === 0 ? "inactivated" : "activated"}
          disabled={cart[menuIndex].length === 0 ? false : true}
          onPress={() => console.log("결제")}
        >
          <BtnText>총 {totalPrice}원 주문하기</BtnText>
        </BtnBottomCTA>
      </Helper>
    </>
  );
};

export default Cart;
