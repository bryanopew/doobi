import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { NavigationProps } from "~/constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import styled from "styled-components/native";
import colors from "~/styles/colors";
import NutrientsProgress from "~/components/common/NutrientsProgress";
import {
  Col,
  HorizontalSpace,
  Row,
  TextMain,
  VerticalLine,
} from "~/styles/styledConsts";
import OrderedList from "~/components/payment/OrderedList";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundLight};
`;

const ProgressBox = styled.View`
  background-color: ${colors.white};
  padding: 0px 16px 0px 16px;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 0px 8px 24px 8px;
`;

const Card = styled.View`
  width: 100%;
  padding: 0px 8px 16px 8px;
  margin-top: 16px;
  background-color: ${colors.white};
  border-radius: 10px;
`;

const CardTitle = styled(TextMain)`
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
  align-self: center;
`;

const MenuNutrContainer = styled(Row)`
  margin-top: 24px;
  width: 100%;
  align-items: center;
`;

const MenuNutrBox = styled(Row)``;

const MenuNutr = styled(TextMain)`
  font-size: 12px;
  font-weight: lighter;
`;

const MenuNutrValue = styled(TextMain)`
  font-size: 14px;
`;

const PaymentDetail = ({
  navigation: { navigate, setOptions },
  route,
}: NavigationProps) => {
  // redux
  const { menuIndex } = useSelector((state: RootState) => state.cart);

  interface IMenu {
    id: string;
    foods: Array<number>;
    menuCalories: string;
    nutr: Array<{ nutr: string; value: string }>;
  }
  interface IOrder {
    id: string;
    date: string;
    menu: Array<IMenu>;
    totalPrice: string;
  }
  const orderInfo: IOrder = route?.params.item;
  console.log("PaymentDetail: orderInfo:", orderInfo);
  useEffect(() => {
    setOptions({ headerTitle: route?.params?.date });
  }, []);

  const renderOrderedMenuList = ({ item }: { item: IMenu }) => (
    <Card>
      <CardTitle>끼니 {item.id}</CardTitle>
      <MenuNutrContainer>
        {item.nutr.map((menu, index) => (
          <Row style={{ flex: 1, height: 38 }} key={menu.nutr}>
            <Col style={{ flex: 1, alignItems: "center" }}>
              <MenuNutr>{menu.nutr}</MenuNutr>
              <MenuNutrValue>{menu.value}</MenuNutrValue>
            </Col>
            {item.nutr.length - 1 === index || <VerticalLine />}
          </Row>
        ))}
      </MenuNutrContainer>
      {item.foods.map((food, index) => (
        <Col key={index}>
          <OrderedList food={food} />
        </Col>
      ))}
    </Card>
  );
  return (
    <Container>
      <ProgressBox>
        <NutrientsProgress menuIndex={menuIndex} />
      </ProgressBox>
      <ContentContainer>
        <FlatList data={orderInfo.menu} renderItem={renderOrderedMenuList} />
      </ContentContainer>
    </Container>
  );
};

export default PaymentDetail;
