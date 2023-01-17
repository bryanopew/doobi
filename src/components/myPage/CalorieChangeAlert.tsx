import { View, Text } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { RootState } from "~/stores/store";
import {
  IFormField,
  purposeCdToValue,
  validationRules,
} from "~/constants/constants";
import {
  AlertContentContainer,
  Col,
  ErrorBox,
  ErrorText,
  InputHeaderText,
  TextMain,
  TextSub,
  UserInfoTextInput,
} from "~/styles/styledConsts";
import { Controller, useForm, useWatch } from "react-hook-form";

const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const PurposeText = styled(TextMain)`
  font-size: 16px;
`;
const PurposeTextBold = styled(PurposeText)`
  font-weight: bold;
`;
const WeightDifference = styled(TextMain)`
  font-size: 18px;
  margin-top: 16px;
`;
const WeightDifferenceValue = styled(WeightDifference)`
  font-weight: bold;
`;

const GuideText = styled(TextSub)`
  font-size: 14px;
`;

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

const renderCalorieInput = ({
  field: { onChange, onBlur, value },
}: IFormField) => {
  return (
    <>
      <InputHeader isActivated={value ? true : false}>
        칼로리 (kcal)
      </InputHeader>
      <Input
        placeholder="칼로리 (kcal)"
        value={value}
        onChangeText={onChange}
        isActivated={value ? true : false}
        keyboardType="numeric"
        maxLength={3}
      />
    </>
  );
};

const CalChangeAlert = ({
  type,
  control,
  handleSubmit,
  errors,
}: {
  type: string;
  control: any;
  handleSubmit: Function;
  errors: any;
}) => {
  // redux
  const { userInfo, userTarget } = useSelector(
    (state: RootState) => state.userInfo
  );

  useEffect(() => {
    handleSubmit(() => console.log("handleSubmit!"))();
  }, []);

  return (
    <Container>
      <Col style={{ marginTop: 24 }}>
        <PurposeText>{userInfo.nickname} 님의 목표는</PurposeText>
        <PurposeText>
          <PurposeTextBold>
            {purposeCdToValue[userInfo.dietPurposecd].targetText}
          </PurposeTextBold>
          입니다
        </PurposeText>
      </Col>
      <WeightDifference>
        2주 전 평균:
        <WeightDifferenceValue>101</WeightDifferenceValue> kg | 현재:
        <WeightDifferenceValue>99</WeightDifferenceValue> kg
      </WeightDifference>
      <Col style={{ marginTop: 8 }}>
        <GuideText>계획과 다르다면 기존보다 </GuideText>
        <GuideText>50 kcal 정도씩 조정해보세요</GuideText>
      </Col>
      <Controller
        control={control}
        rules={validationRules.caloriePerMeal}
        render={(field) => renderCalorieInput(field)}
        name="calorie"
      />
      {errors.calorie && (
        <ErrorBox>
          <ErrorText>{errors.calorie.message}</ErrorText>
        </ErrorBox>
      )}
    </Container>
  );
};

export default CalChangeAlert;
