import { View, Text } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import {
  Col,
  ErrorBox,
  ErrorText,
  InputHeaderText,
  TextMain,
  UserInfoTextInput,
} from "~/styles/styledConsts";
import { useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import { validationRules } from "~/constants/constants";
import { IFormField } from "~/constants/constants";

const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const GuideText = styled(TextMain)`
  font-size: 16px;
`;

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

const nutrTextByNutr: { [key: string]: string } = {
  carb: "탄수화물",
  protein: "단백질",
  fat: "지방",
};

// TBD | renderInput 이것도 겹치는 것 꽤 많은 듯. (useRef같은 것 쓰는건 컴포넌트로 못빼겠지..?!)
const renderNutrInput = (
  { field: { onChange, onBlur, value } }: IFormField,
  nutrText: string
) => {
  return (
    <>
      <InputHeader isActivated={value ? true : false}>
        {nutrText} (g)
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

const NutrChangeAlert = ({
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
  useEffect(() => {
    handleSubmit(() => console.log("handleSubmit!"))();
  }, []);
  const nutrText = nutrTextByNutr[type];
  console.log(nutrText);

  return (
    <Container>
      <Col style={{ marginTop: 24 }}>
        <GuideText>다른 영양소는 칼로리에 맞게</GuideText>
        <GuideText>자동으로 조절됩니다</GuideText>
      </Col>
      <Col style={{ marginTop: 16 }}>
        <GuideText>모든 영양소를 조정하고 싶은 경우는</GuideText>
        <GuideText>고객정보변경을 이용해주세요</GuideText>
      </Col>
      <Controller
        control={control}
        rules={validationRules[type]}
        render={(field) => renderNutrInput(field, nutrText)}
        name={type}
      />
      {errors[type] && (
        <ErrorBox>
          <ErrorText>{errors[type].message}</ErrorText>
        </ErrorBox>
      )}
    </Container>
  );
};

export default NutrChangeAlert;
