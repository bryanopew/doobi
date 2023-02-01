import React from "react";
import styled from "styled-components/native";
import {
  AccordionContentContainer,
  TextMain,
  Col,
  Row,
  HorizontalLine,
} from "~/styles/styledConsts";
import { IProduct, NavigationProps } from "~/constants/constants";
import { BASE_URL } from "~/query/urls";
import colors from "~/styles/colors";

const MenuTitle = styled(TextMain)`
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  align-self: center;
`;

const FoodThumbnail = styled.Image`
  width: 72px;
  height: 72px;
`;

const SellerText = styled(TextMain)`
  font-size: 14px;
  font-weight: bold;
`;

const ProductName = styled(TextMain)`
  font-size: 14px;
`;

const QuantityBox = styled.View`
  width: 80px;
  height: 24px;
`;

const PriceAndQuantity = styled(TextMain)`
  font-size: 16px;
  font-weight: bold;
`;

interface IFoodToOrder {
  cartInfo: Array<Array<IProduct>>;
}
const FoodToOrder = ({ cartInfo }: IFoodToOrder) => {
  return (
    <AccordionContentContainer>
      {cartInfo.map((menu, index) => (
        <Col key={index}>
          <MenuTitle>{`끼니 ${index}`}</MenuTitle>
          <HorizontalLine
            style={{ marginTop: 8, backgroundColor: colors.line }}
          />
          {menu.map((product, index) => (
            <Row key={index} style={{ marginTop: 16 }}>
              <FoodThumbnail
                source={{
                  uri: `${BASE_URL}${product.mainAttUrl}`,
                }}
              />
              <Col style={{ flex: 1, marginLeft: 8 }}>
                <SellerText numberOfLines={1} ellipsizeMode="tail">
                  {product.platformNm}
                </SellerText>
                <ProductName numberOfLines={1} ellipsizeMode="tail">
                  {product.productNm}
                </ProductName>
                <Row
                  style={{
                    marginTop: 8,
                    justifyContent: "space-between",
                  }}
                >
                  <PriceAndQuantity>{product.price}</PriceAndQuantity>
                  <QuantityBox>
                    <PriceAndQuantity>{product.qty}개</PriceAndQuantity>
                  </QuantityBox>
                </Row>
              </Col>
            </Row>
          ))}
          <HorizontalLine
            lineColor={colors.lineLight}
            style={{ marginTop: 16 }}
          />
        </Col>
      ))}
    </AccordionContentContainer>
  );
};

export default FoodToOrder;
