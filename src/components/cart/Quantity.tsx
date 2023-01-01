import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import {
  BtnCTA,
  BtnText,
  Col,
  Container,
  HorizontalLine,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
} from "~/styles/styledConsts";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToMenu,
  deleteProduct,
  plusProductQuantity,
  minusProductQuantity,
} from "~/stores/slices/cartSlice";

const Number = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 20px;
`;
const NumberImage = styled.Image`
  width: 16px;
  height: 16px;
`;

const Quantity = (props) => {
  const dispatch = useDispatch();
  const { cart, menuIndex } = useSelector((state: RootState) => state.cart);
  return (
    <>
      <TouchableOpacity
        onPress={() => dispatch(minusProductQuantity(props.product))}
      >
        <NumberImage source={require(`~/assets/icons/12_numberMinus.png`)} />
      </TouchableOpacity>
      <Number>{cart[menuIndex][props.index].qty}</Number>
      <TouchableOpacity
        onPress={() => dispatch(plusProductQuantity(props.product))}
      >
        <NumberImage source={require(`~/assets/icons/12_numberPlus.png`)} />
      </TouchableOpacity>
    </>
  );
};

export default Quantity;
