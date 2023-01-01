import { View, Text } from "react-native";
import React, { SetStateAction } from "react";
import styled from "styled-components/native";
import { TextMain } from "~/styles/styledConsts";
import { SCREENWIDTH } from "~/constants/constants";

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 50px;
  width: ${(SCREENWIDTH - 36) / 4}px;
`;

const NutrValue = styled(TextMain)`
  margin-top: 4px;
  font-size: 12px;
`;

const ColorBar = styled.View`
  width: 50px;
  height: 4px;
  margin-top: 4px;
  background-color: ${({ color }: { color: string }) => color};
`;

const Nutr = styled(TextMain)`
  font-size: 14px;
  font-weight: bold;
`;

interface INutrTarget {
  nutrient: string;
  value: string;
  color: string;
  onPress: () => void;
}
const NutrTarget = ({ nutrient, value, color, onPress }: INutrTarget) => {
  return (
    <Container onPress={onPress}>
      <Nutr>{parseInt(value)}</Nutr>
      <ColorBar color={color} />
      <NutrValue>{nutrient}</NutrValue>
    </Container>
  );
};

export default NutrTarget;
