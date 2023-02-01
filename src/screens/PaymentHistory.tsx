import { View, Text, FlatList } from "react-native";
import React from "react";
import {
  Col,
  Container,
  HorizontalLine,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
  VerticalLine,
  VerticalSpace,
} from "~/styles/styledConsts";
import styled from "styled-components/native";
import colors from "~/styles/colors";
import { NavigationProps } from "~/constants/constants";

const OrderDate = styled(TextSub)`
  font-size: 12px;
`;

const DetailBtn = styled.TouchableOpacity`
  width: 64px;
  height: 24px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.lineLight};
  align-items: center;
  justify-content: center;
`;

const DetailBtnText = styled(TextMain)`
  font-size: 14px;
`;

const CaloriesText = styled(TextMain)`
  margin-top: 8px;
  font-size: 14px;
`;

const Arrow = styled.Image`
  margin-top: 32px;
  width: 20px;
  height: 20px;
`;

const ThumbnailBtn = styled.TouchableOpacity``;
const ThumbnailImage = styled.View`
  background-color: ${colors.backgroundLight};
  width: 56px;
  height: 56px;
  border-radius: 2px;
`;

const TotalPrice = styled(TextMain)`
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  align-self: flex-end;
`;

interface IOrder {
  id: string;
  date: string;
  menu: Array<{
    id: string;
    foods: Array<number>;
    menuCalories: string;
    nutr: Array<{ nutr: string; value: string }>;
  }>;
  totalPrice: string;
}
const testData: Array<IOrder> = [
  {
    id: "1",
    date: "2022.07.11 | 16.32",
    menu: [
      {
        id: "1",
        foods: [1, 2, 3],
        menuCalories: "830kcal",
        nutr: [
          { nutr: "칼로리", value: "521 kcal" },
          { nutr: "탄수화물", value: "61 g" },
          { nutr: "단백질", value: "30 g" },
          { nutr: "지방", value: "14 g" },
        ],
      },
      {
        id: "2",
        foods: [4, 5],
        menuCalories: "817kcal",
        nutr: [
          { nutr: "칼로리", value: "521 kcal" },
          { nutr: "탄수화물", value: "61 g" },
          { nutr: "단백질", value: "30 g" },
          { nutr: "지방", value: "14 g" },
        ],
      },
    ],
    totalPrice: "25000",
  },
  {
    id: "2",
    date: "2022.07.11 | 16.32",
    menu: [
      {
        id: "1",
        foods: [1, 2, 3],
        menuCalories: "830kcal",
        nutr: [
          { nutr: "칼로리", value: "521 kcal" },
          { nutr: "탄수화물", value: "61 g" },
          { nutr: "단백질", value: "30 g" },
          { nutr: "지방", value: "14 g" },
        ],
      },
      {
        id: "2",
        foods: [4, 5],
        menuCalories: "817kcal",
        nutr: [
          { nutr: "칼로리", value: "521 kcal" },
          { nutr: "탄수화물", value: "61 g" },
          { nutr: "단백질", value: "30 g" },
          { nutr: "지방", value: "14 g" },
        ],
      },
      {
        id: "3",
        foods: [6, 7, 8],
        menuCalories: "817kcal",
        nutr: [
          { nutr: "칼로리", value: "521 kcal" },
          { nutr: "탄수화물", value: "61 g" },
          { nutr: "단백질", value: "30 g" },
          { nutr: "지방", value: "14 g" },
        ],
      },
    ],
    totalPrice: "25000",
  },
];

const PaymentHistory = ({ navigation: { navigate } }: NavigationProps) => {
  type IMenu = { id: string; foods: number[]; menuCalories: string };
  const renderMenuList = ({ item }: { item: IMenu }) => {
    return (
      <Col>
        <CaloriesText>{item.menuCalories}</CaloriesText>
        <Row style={{ marginTop: 8 }}>
          {item.foods.map((food, index) => (
            <Row key={index}>
              <ThumbnailImage />
              {item.foods.length - 1 === index || <VerticalSpace width={8} />}
            </Row>
          ))}
        </Row>
      </Col>
    );
  };

  const renderOrderList = ({ item }: { item: IOrder }) => (
    <>
      <Row
        style={{
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <OrderDate>{item.date}</OrderDate>
        <DetailBtn
          onPress={() =>
            navigate("PaymentDetail", {
              item,
            })
          }
        >
          <DetailBtnText>상세보기</DetailBtnText>
        </DetailBtn>
      </Row>
      <HorizontalLine style={{ marginTop: 8 }} />
      <Row>
        <Arrow source={require(`~/assets/icons/20_leftArrow.png`)} />
        <FlatList
          horizontal={true}
          data={item.menu}
          renderItem={renderMenuList}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <VerticalLine
              height={56}
              style={{ marginHorizontal: 8, alignSelf: "flex-end" }}
            />
          )}
        />
        <Arrow source={require(`~/assets/icons/20_rightArrow.png`)} />
      </Row>
      <TotalPrice>{item.totalPrice} 원</TotalPrice>
    </>
  );
  return (
    <Container>
      <HorizontalSpace height={24} />
      <FlatList
        data={testData}
        renderItem={renderOrderList}
        ItemSeparatorComponent={() => <HorizontalSpace height={24} />}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

export default PaymentHistory;
