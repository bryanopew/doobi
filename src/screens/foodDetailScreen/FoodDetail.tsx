import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import styled from "styled-components/native";

import {
  BtnCTA,
  BtnText,
  BtnBottomCTA,
  Col,
  Container,
  HorizontalLine,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
} from "~/styles/styledConsts";
import colors from "~/styles/colors";
import { BASE_URL } from "~/query/urls";
import { SCREENWIDTH } from "~/constants/constants";

import NutrientsProgress from "~/components/common/NutrientsProgress";
import NutrientPart from "./foodDetailSubScreen/NutrientPart";

const FoodImageContainer = styled.Image`
  margin-left: 50px;
  width: 240px;
  height: 180px;
`;
const SellerText = styled(TextSub)`
  margin-top: 10px;
  font-size: 14px;
`;
const ProductName = styled(TextMain)`
  margin-top: 4px;
  font-size: 20px;
  font-weight: bold;
`;
const ShippingText = styled(TextMain)`
  margin-top: 4px;
  font-size: 14px;
`;
const Price = styled(TextMain)`
  font-size: 28px;
  font-weight: bold;
  margin-left: 90px;
`;

const DetailMenu = styled.TouchableOpacity`
  width: 74px;
  height: 32px;
  margin-top: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
  border: 1px;
  border-radius: 5px;
  border-color: ${colors.inActivated}
  align-items: center;
  justify-content: center;
`;
const ActivateDetailMenu = styled.TouchableOpacity`
  width: 74px;
  height: 32px;
  margin-top: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
  border: 1px;
  border-radius: 5px;
  border-color: ${colors.inActivated}
  background-color: ${colors.inActivated}
  align-items: center;
  justify-content: center;
`;
const DetailMenuText = styled(TextMain)`
  font-size: 14px;
`;

const PartContainer = styled.View``;

const FoodPart = () => {
  return <Text>식품 상세 표시</Text>;
};
const ReviewPart = () => {
  return <Text>후기 표시</Text>;
};
const ShippingPart = () => {
  return <Text>배송 표시</Text>;
};

const ShowPart = (i) => {
  return i.index === 0 ? (
    <NutrientPart />
  ) : i.index === 1 ? (
    <FoodPart />
  ) : i.index === 2 ? (
    <ReviewPart />
  ) : i.index === 3 ? (
    <ShippingPart />
  ) : (
    <NutrientPart />
  );
};

const FoodDetail = (arg) => {
  const index = arg.route.params.menuIndex;
  let {
    item: { item: item },
  } = arg.route.params;
  const detailMenu = ["영양성분", "식품상세", "후기", "배송정책"];
  const [clicked, setClicked] = useState(0);
  return (
    <Container>
      <ScrollView>
        <NutrientsProgress menuIndex={index} />
        <FoodImageContainer
          source={{
            uri: `${BASE_URL}${item.mainAttUrl}`,
          }}
        />
        <SellerText>[{item.platformNm}]</SellerText>
        <ProductName>{item.productNm}</ProductName>
        <Row>
          <Col>
            <ShippingText>60,000원 이상 무료배송 </ShippingText>
            <ShippingText>최소수량: 1개</ShippingText>
          </Col>
          <Price>{item.price}원</Price>
        </Row>
        <Row>
          {detailMenu.map((el, index) => {
            return (
              <React.Fragment key={index}>
                <DetailMenu onPress={() => setClicked(index)}>
                  <DetailMenuText>{el}</DetailMenuText>
                </DetailMenu>
              </React.Fragment>
            );
          })}
        </Row>
        <PartContainer>
          <ShowPart index={clicked} />
        </PartContainer>
        {/* <BtnBottomCTA btnStyle={"activated"}>
        <BtnText>장바구니 추가</BtnText>
      </BtnBottomCTA> */}
      </ScrollView>
    </Container>
  );
};

export default FoodDetail;
