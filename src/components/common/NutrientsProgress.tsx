import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import colors from "~/styles/colors";
import { Col, Row, VerticalSpace } from "~/styles/styledConsts";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import { calculateCartNutr } from "~/util/targetCalculation";

const ProgressBarContainer = styled.View`
  flex: 1;
  height: 70px;
  justify-content: center;
`;

const ProgressBarTitle = styled.Text`
  font-size: 12px;
  color: ${colors.textMain};
  text-align: left;
`;
const ProgressBarNumber = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  color: ${colors.textMain};
  text-align: right;
`;

const Container = styled.View`
  background-color: ${colors.white};
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const indicatorColorsByTitle: { [key: string]: string } = {
  "칼로리(g)": colors.main,
  "탄수화물(g)": colors.blue,
  "단백질(g)": colors.green,
  "지방(g)": colors.orange,
};

const NutrUpperBoundByTitle: { [key: string]: number } = {
  "칼로리(g)": 50,
  "탄수화물(g)": 15,
  "단백질(g)": 5,
  "지방(g)": 5,
};

/** props:
 * 1. title '칼로리(g)' | '탄수화물(g)' | '단백질(g)' | '지방(g)'
 * 2. numerator(일부값)
 * 3. denominator(전체값) */
interface INutrientProgress {
  title: string;
  numerator: number;
  denominator: number;
}
const ProgressBar = ({ title, numerator, denominator }: INutrientProgress) => {
  const indicatorColor =
    numerator > denominator + NutrUpperBoundByTitle[title]
      ? colors.warning
      : indicatorColorsByTitle[title];
  return (
    <ProgressBarContainer>
      <ProgressBarTitle>{title}</ProgressBarTitle>
      <Progress.Bar
        style={{ marginTop: 5 }}
        progress={numerator / denominator}
        width={null}
        height={4}
        color={indicatorColor}
        unfilledColor={colors.bgBox}
        borderWidth={0}
      />
      <ProgressBarNumber>{`${numerator}/${denominator}`}</ProgressBarNumber>
    </ProgressBarContainer>
  );
};

const NutrientsProgress = ({ menuIndex }: { menuIndex: number }) => {
  const { userTarget } = useSelector((state: RootState) => state.userInfo);
  const { cart } = useSelector((state: RootState) => state?.cart);
  const { calorie, carb, protein, fat } = calculateCartNutr(cart[menuIndex]);
  return (
    <Container>
      <ProgressBar
        title="칼로리(g)"
        numerator={calorie}
        denominator={parseInt(userTarget.calorie)}
      />
      <VerticalSpace width={8} />
      <ProgressBar
        title="탄수화물(g)"
        numerator={carb}
        denominator={parseInt(userTarget.carb)}
      />
      <VerticalSpace width={8} />
      <ProgressBar
        title="단백질(g)"
        numerator={protein}
        denominator={parseInt(userTarget.protein)}
      />
      <VerticalSpace width={8} />
      <ProgressBar
        title="지방(g)"
        numerator={fat}
        denominator={parseInt(userTarget.fat)}
      />
    </Container>
  );
};

export default NutrientsProgress;
