import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Col, Row, TextMain, TextSub } from "~/styles/styledConsts";
import colors from "~/styles/colors";

const ThumbnailImage = styled.Image`
  width: 72px;
  height: 72px;
  background-color: ${colors.highlight};
`;

const Seller = styled(TextMain)`
  font-size: 14px;
  font-weight: bold;
`;

const BtnPlusNCancel = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;
const BtnImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const ProductName = styled(TextMain)`
  margin-top: 6px;
  font-size: 14px;
`;

const NutrBox = styled.View`
  margin-top: 4px;
`;

const NutrText = styled(TextSub)`
  font-size: 12px;
`;

const NutrValue = styled(TextMain)`
  font-size: 12px;
`;

const PriceNQuantity = styled(TextMain)`
  margin-top: 12px;
  font-size: 16px;
  font-weight: bold;
`;

const QuantityBox = styled.View`
  width: 82px;
  justify-content: center;
  align-items: center;
`;

const OrderedList = ({ food }: { food: Array<number> }) => {
  return (
    <Row style={{ flex: 1, alignItems: "flex-start", marginTop: 24 }}>
      <ThumbnailImage />
      <Col style={{ flex: 1, marginLeft: 8 }}>
        <Row style={{ justifyContent: "space-between" }}>
          <Seller numberOfLines={1} ellipsizeMode="tail">
            존맛존맛
          </Seller>
          <BtnPlusNCancel>
            <BtnImage
              source={require(`~/assets/icons/24_plus_round_small.png`)}
            />
          </BtnPlusNCancel>
        </Row>
        <ProductName numberOfLines={1} ellipsizeMode="tail">
          포켓샐러드 파스타 샐러드
        </ProductName>
        <Row>
          <NutrText numberOfLines={1} ellipsizeMode="tail">
            칼로리 <NutrValue>xxx kcal </NutrValue>
            탄수화물 <NutrValue>xx g </NutrValue>
            단백질 <NutrValue>xx g </NutrValue>
            지방 <NutrValue>xx g </NutrValue>
          </NutrText>
        </Row>
        <Row
          style={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <PriceNQuantity>4,300원</PriceNQuantity>
          <QuantityBox>
            <PriceNQuantity>3개</PriceNQuantity>
          </QuantityBox>
        </Row>
      </Col>
    </Row>
  );
};

export default OrderedList;
