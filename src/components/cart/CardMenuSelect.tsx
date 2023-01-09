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
  addProductToMenu,
  deleteProduct,
  setMenuIndex,
  addMenuToCart,
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

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const PickMenu = styled.TouchableOpacity`
  border: 1px;
  border-radius: 5px;
  border-color: ${colors.white}
  width: 74px;
  height: 32px;
  align-items: center;
  background-color: ${colors.white}
  margin-right: 10px;
`;
const PickMenuActivated = styled.TouchableOpacity`
  border: 1px;
  border-radius: 5px;
  border-color: ${colors.inActivated}
  width: 74px;
  height: 32px;
  align-items: center;
  background-color: ${colors.inActivated}
  margin-right: 10px;
`;

const TotalPriceText = styled(TextMain)`
  font-size: 14px;
  padding: 5px;
`;

const AddMenuButton = (props) => {
  const dispatch = useDispatch();

  return (
    <PickMenu
      onPress={() => {
        dispatch(addMenuToCart());
      }}
    >
      <TotalPriceText>+</TotalPriceText>
    </PickMenu>
  );
};
const CardMenuSelect = () => {
  const { cart, menuIndex, pickedCart } = useSelector(
    (state: RootState) => state.cart
  );
  const [clicked, setClicked] = useState(0);
  const dispatch = useDispatch();
  const menuInfo = (arg) =>
    arg.map((el, index) => {
      return `식단 ${index + 1}`;
    });
  let cardMenuArray = menuInfo(cart).map((el) => {
    return el;
  });
  return (
    <>
      <Row>
        {cardMenuArray.map((el, index) => {
          return (
            <PickMenu
              key={index}
              onPress={() => {
                dispatch(setMenuIndex(index));
                setClicked(index);
              }}
            >
              <TotalPriceText>{el}</TotalPriceText>
            </PickMenu>
          );
        })}
        {cart.length < 3 ? <AddMenuButton /> : null}
      </Row>
    </>
  );
};

export default CardMenuSelect;
