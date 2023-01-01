import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "@react-native-community/checkbox";

import { RootState } from "~/stores/store";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "~/styles/colors";
import { SCREENWIDTH } from "~/constants/constants";
import { BASE_URL } from "~/query/urls";
import { addProductToMenu, deleteProduct } from "~/stores/slices/cartSlice";

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

import NutrientsProgress from "~/components/common/NutrientsProgress";
import MenuHeader from "~/components/common/MenuHeader";
import MenuSelect from "~/components/common/MenuSelect";
import Quantity from "~/components/cart/Quantity";
import { initialWindowMetrics } from "react-native-safe-area-context";

const Thumbnail = styled.Image`
  width: 100px;
  height: 100px;
  /* background-color: ${colors.highlight}; */
`;
const ProductInfoContainer = styled.View`
  flex: 1;
  height: 120px;
  margin-left: 16px;
  margin-top: 15px;
  justify-content: space-between;
  /* background-color: ${colors.highlight}; */
`;
const NutrSummaryContainer = styled.View`
  flex-direction: row;
  width: 110%;
  height: 22px;
  border-radius: 5px;
  margin-top: 5px;
  justify-content: space-between;
  background-color: ${colors.white};
`;
const MainText = styled(TextSub)`
  margin-top: 20px;
  font-size: 14px;
`;
const AutoText = styled(TextSub)`
  font-size: 14px;
  padding: 35px;
`;
const AddButtonImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-left: 60px;
  left: 25px;
`;

const AutoButton = styled.TouchableOpacity`
  margin-top: 10px;
  border-width: 1px;
  border-color: ${colors.main};
  border-radius: 3px;
`;

const EmptyCart = () => {
  const { cart, menuIndex } = useSelector((state: RootState) => state.cart);
  const [menuSelectOpen, setMenuSelectOpen] = useState(false);
  const [checkAllClicked, setCheckAllClicked] = useState(false);
  const [data, setData] = useState();
  const dispatch = useDispatch();

  //data로 받아온값 확인
  return (
    <>
      <MainText>식품을 추가해보세요</MainText>
      <AutoButton>
        <Row>
          <AddButtonImage
            source={require(`~/assets/icons/24_autoMenu_activated.png`)}
          />
          <AutoText>귀찮을땐 자동구성</AutoText>
        </Row>
      </AutoButton>
    </>
  );
};

export default EmptyCart;
