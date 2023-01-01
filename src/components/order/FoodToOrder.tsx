import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import styled from "styled-components/native";
import { AccordionContentContainer } from "~/styles/styledConsts";

const FoodToOrder = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  return (
    <AccordionContentContainer>
      <Text>FoodToOrder</Text>
    </AccordionContentContainer>
  );
};

export default FoodToOrder;
