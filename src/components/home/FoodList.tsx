import { View, Text, Image } from "react-native";
import React from "react";
import styled from "styled-components/native";
import colors from "~/styles/colors";
import { Col, Row, TextMain, TextSub } from "~/styles/styledConsts";
import { BASE_URL } from "~/query/urls";
import { hasProduct } from "~/util/reduxUtil";
import { useDispatch, useSelector, batch } from "react-redux";
import { AppDispatch, RootState } from "~/stores/store";
import {
  addProductToMenu,
  deleteProduct,
  makeQuantity,
} from "~/stores/slices/cartSlice";
import { NavigationProps } from "~/constants/constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { SCREENWIDTH } from "~/constants/constants";
import { NavigationContainer } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
`;

const Thumbnail = styled.Image`
  width: 100px;
  height: 100px;
  /* background-color: ${colors.highlight}; */
`;

const ProductInfoContainer = styled.View`
  flex: 1;
  height: 100px;
  margin-left: 16px;
  justify-content: space-between;
  /* background-color: ${colors.highlight}; */
`;

const NutrSummaryContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 22px;
  border-radius: 5px;
  margin-top: 10px;
  padding: 3px 8px 3px 8px;
  justify-content: space-between;
  background-color: ${colors.line};
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
`;

const Nutr = styled.View`
  flex-direction: row;
  width: ${(SCREENWIDTH - 16) / 5}px;
`;

const NutrText = styled(TextSub)`
  font-size: 12px;
`;

const NutrValue = styled(TextMain)`
  font-size: 12px;
`;

const AddOrDeleteBtn = styled.TouchableOpacity`
  height: 100%;
  margin-left: 16px;
  align-self: flex-start;
  /* background-color: ${colors.highlight}; */
`;

const AddToCartBtnImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const FoodDetailBtn = styled.TouchableOpacity``;

interface IFoodList {
  item: {
    item: {
      [key: string]: string;
    };
  };
  menuIndex: number;
}

const FoodList = ({ item, menuIndex, navigation }: IFoodList) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const itemExist = hasProduct(cart[menuIndex], item.item.productNo);
  return (
    <Container>
      <FoodDetailBtn
        onPress={() => {
          navigation.navigate("FoodDetail", { menuIndex, item });
        }}
      >
        <Row>
          <Thumbnail
            source={{
              uri: `${BASE_URL}${item.item.mainAttUrl}`,
            }}
          />
          <ProductInfoContainer>
            <Col>
              <SellerText numberOfLines={1} ellipsizeMode="tail">
                {item.item?.platformNm}
              </SellerText>
              <ProductName numberOfLines={2} ellipsizeMode="tail">
                {item.item?.productNm}
              </ProductName>
            </Col>
            <Price>{item.item?.price}원</Price>
          </ProductInfoContainer>
          <AddOrDeleteBtn
            onPress={() => {
              itemExist
                ? dispatch(
                    deleteProduct({ menuIndex, productNo: item.item.productNo })
                  )
                : dispatch(addProductToMenu({ menuIndex, product: item.item }));
              dispatch(makeQuantity({ product: item.item }));
            }}
          >
            {itemExist ? (
              <AddToCartBtnImage
                source={require(`~/assets/icons/24_foodDelete.png`)}
              />
            ) : (
              <AddToCartBtnImage
                source={require(`~/assets/icons/24_foodAdd.png`)}
              />
            )}
          </AddOrDeleteBtn>
        </Row>
      </FoodDetailBtn>

      <NutrSummaryContainer>
        <Nutr>
          <NutrText>칼로리</NutrText>
          <NutrValue> {parseInt(item.item.calorie)}</NutrValue>
        </Nutr>
        <Nutr>
          <NutrText>탄수화물</NutrText>
          <NutrValue> {parseInt(item.item.carb)}</NutrValue>
        </Nutr>
        <Nutr>
          <NutrText>단백질</NutrText>
          <NutrValue> {parseInt(item.item.protein)}</NutrValue>
        </Nutr>
        <Nutr>
          <NutrText>지방</NutrText>
          <NutrValue> {parseInt(item.item.fat)}</NutrValue>
        </Nutr>
      </NutrSummaryContainer>
    </Container>
  );
};

export default FoodList;
