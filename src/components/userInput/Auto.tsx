import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import colors from "~/styles/colors";
import { Col } from "~/styles/styledConsts";
import { useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import { purposeCdToValue } from "~/constants/constants";

const ContentsContainer = styled.View`
  margin-top: 12px;
  border-width: 1px;
  border-color: ${colors.main};
  border-radius: 5px;
  padding: 16px;
`;

const NutrientSummaryText = styled.Text`
  font-size: 12px;
  color: ${colors.textMain};
`;

const Auto = () => {
  const {
    userInfo: { dietPurposecd },
    userTarget: { tmr, calorie, carb, protein, fat },
  } = useSelector((state: RootState) => state.userInfo);
  const purposeText = purposeCdToValue[dietPurposecd].targetText;
  const calorieModText = purposeCdToValue[dietPurposecd].additionalCalorieText;

  return (
    <ContentsContainer>
      <Col>
        <NutrientSummaryText>{`칼로리: ${calorie} kcal`}</NutrientSummaryText>
        <NutrientSummaryText>{`탄수화물: ${carb} g`}</NutrientSummaryText>
        <NutrientSummaryText>{`단백질: ${protein} g`}</NutrientSummaryText>
        <NutrientSummaryText>{`지방: ${fat} g`}</NutrientSummaryText>
      </Col>
      <Col style={{ marginTop: 8 }}>
        <NutrientSummaryText>
          {` 고객님의 기초대사량과 활동대사량을 추정하여 하루 총 사용하는 칼로리를${tmr}kcal로 계산했어요. `}
        </NutrientSummaryText>
        <NutrientSummaryText style={{ marginTop: 4 }}>
          {` ${purposeText}을 위해 하루에 ${calorieModText}를 제한하여 한 끼기준${calorie}kcal를 추천드립니다.`}
        </NutrientSummaryText>
        <NutrientSummaryText style={{ marginTop: 4 }}>
          {` 탄수화물, 단백질, 지방 비율 은 보건복지부 한국인 영양섭취기준(2020)에서 권장하는 비율로 설정했습니다.`}
        </NutrientSummaryText>
      </Col>
    </ContentsContainer>
  );
};

export default Auto;
