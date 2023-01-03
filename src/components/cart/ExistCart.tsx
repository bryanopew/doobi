import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "@react-native-community/checkbox";

import { RootState } from "~/stores/store";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "~/styles/colors";
import { SCREENWIDTH } from "~/constants/constants";
import { BASE_URL } from "~/query/urls";
import {
  addProductToMenu,
  deleteProduct,
  plusProductQuantity,
  pickProductCheckBox,
} from "~/stores/slices/cartSlice";

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

import Quantity from "~/components/cart/Quantity";

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
const CheckBoxText = styled(TextMain)`
  font-size: 14px;
`;
const DeleteSelect = styled(TextMain)`
  font-size: 14px;
  margin-left: 170px;
  border-width: 1px;
`;
const SellerText = styled(TextMain)`
  font-size: 14px;
  font-weight: bold;
`;
const ProductName = styled(TextMain)`
  margin-top: 4px;
  font-size: 14px;
`;
const Price = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
  align-items: flex-end;
`;
const Nutr = styled.View`
  flex-direction: row;
`;

const NutrText = styled(TextSub)`
  font-size: 12px;
`;

const NutrValue = styled(TextMain)`
  font-size: 12px;
`;

const AddOrDeleteBtn = styled.TouchableOpacity`
  height: 30%;
  margin-left: 16px;
  align-self: flex-start;
  /* background-color: ${colors.highlight}; */
`;
const DeleteBtn = styled.Image`
  width: 24px;
  height: 30px;
  margin-top: 10px;
`;

const EachCheckBoxAndroid = (props) => {
  const [picked, setPicked] = useState(false);
  const dispatch = useDispatch();
  return (
    <View>
      <CheckBox
        value={picked}
        onValueChange={(value) => {
          setPicked(value);
          dispatch(pickProductCheckBox({ id: props.id, picked }));
        }}
        tintColors={{ true: "#30D158" }}
      />
    </View>
  );
};

const CheckAll = (props) => {
  const [clicked, setClicked] = useState(false);
  props.check(clicked);
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

const ExistCart = (props) => {
  const dispatch = useDispatch();
  const { cart, menuIndex, pickedCart } = useSelector(
    (state: RootState) => state.cart
  );
  const [data, setData] = useState();
  const calculatelPrice = () => {
    let price = 0;
    cart[menuIndex].forEach((el) => {
      price += parseInt(el?.price) * el?.qty;
    });
    return price;
  };
  console.log("existCart/pickedCart:", pickedCart);
  console.log(
    "filtered:",
    pickedCart.filter((el) => {
      return "PD20220713000000045" !== el;
    })
  );
  const totalPrice = calculatelPrice();
  useEffect(() => {
    sendTotalPrice(totalPrice);
  }, [totalPrice]);
  const sendTotalPrice = (arg: number) => {
    props.totalPrice(arg);
  };
  return (
    <>
      {cart[menuIndex].map((el, index) => {
        return (
          <React.Fragment key={el.productNo}>
            <Row>
              <View>
                <EachCheckBoxAndroid id={el.productNo} />
                <Thumbnail
                  source={{
                    uri: `${BASE_URL}${el?.mainAttUrl}`,
                  }}
                />
              </View>
              <ProductInfoContainer>
                <Col>
                  <SellerText numberOfLines={1} ellipsizeMode="tail">
                    {el?.platformNm}
                  </SellerText>
                  <ProductName numberOfLines={2} ellipsizeMode="tail">
                    {el?.productNm}
                  </ProductName>
                </Col>
                <NutrSummaryContainer>
                  <Nutr>
                    <NutrText>칼로리</NutrText>
                    <NutrValue> {parseInt(el?.calorie)}</NutrValue>
                  </Nutr>
                  <Nutr>
                    <NutrText>탄수화물</NutrText>
                    <NutrValue> {parseInt(el?.carb)}</NutrValue>
                  </Nutr>
                  <Nutr>
                    <NutrText>단백질</NutrText>
                    <NutrValue> {parseInt(el?.protein)}</NutrValue>
                  </Nutr>
                  <Nutr>
                    <NutrText>지방</NutrText>
                    <NutrValue> {parseInt(el?.fat)}</NutrValue>
                  </Nutr>
                </NutrSummaryContainer>
                <Row>
                  <Price style={{ marginRight: 60 }}>{el?.price}원</Price>
                  <Quantity product={el} setData={setData} index={index} />
                </Row>
              </ProductInfoContainer>
              <AddOrDeleteBtn
                onPress={() => {
                  dispatch(
                    deleteProduct({ menuIndex, productNo: el.productNo })
                  );
                }}
              >
                <DeleteBtn
                  source={require(`~/assets/icons/24_icon=close.png`)}
                />
              </AddOrDeleteBtn>
            </Row>
            <HorizontalLine style={{ marginTop: 10 }} />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ExistCart;
