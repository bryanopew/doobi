import { View, Text } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Controller } from "react-hook-form";
import { IFormField, validationRules } from "~/constants/constants";
import {
  Col,
  ErrorBox,
  ErrorText,
  InputHeaderText,
  Row,
  TextMain,
  TextSub,
  UserInfoTextInput,
} from "~/styles/styledConsts";

const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

const CheckboxContainer = styled.TouchableOpacity``;
const Checkbox = styled.Image`
  width: 24px;
  height: 24px;
`;
const CheckboxText = styled(TextMain)`
  font-size: 16px;
`;

const GuideText = styled(TextSub)`
  font-size: 12px;
  margin-top: 4px;
`;

const renderWeightInput = ({
  field: { onChange, onBlur, value },
}: IFormField) => {
  return (
    <>
      <InputHeader isActivated={value ? true : false}>몸무게 (kg)</InputHeader>
      <Input
        placeholder="몸무게 (kg)"
        value={value}
        onChangeText={onChange}
        isActivated={value ? true : false}
        keyboardType="numeric"
        maxLength={3}
      />
    </>
  );
};

const WeightChangeAlert = ({
  type,
  control,
  handleSubmit,
  errors,
  autoCalculate,
  setAutoCalculate,
}: {
  type: string;
  control: any;
  handleSubmit: Function;
  errors: any;
  autoCalculate: boolean;
  setAutoCalculate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    handleSubmit(() => console.log("handleSubmit!"))();
  }, []);
  return (
    <Container>
      <Controller
        control={control}
        rules={validationRules[type]}
        render={(field) => renderWeightInput(field)}
        name={type}
      />
      {errors[type] && (
        <ErrorBox>
          <ErrorText>{errors[type].message}</ErrorText>
        </ErrorBox>
      )}
      <Row style={{ marginTop: 24, alignItems: "flex-start" }}>
        <CheckboxContainer onPress={() => setAutoCalculate((check) => !check)}>
          {autoCalculate ? (
            <Checkbox
              source={require(`~/assets/icons/24_checkbox_selected.png`)}
            />
          ) : (
            <Checkbox source={require(`~/assets/icons/24_checkbox.png`)} />
          )}
        </CheckboxContainer>
        <Col style={{ marginLeft: 10 }}>
          <CheckboxText>변경한 몸무게로 칼로리 자동조정</CheckboxText>
          <GuideText>영양소는 권장비율로 설정됩니다</GuideText>
        </Col>
      </Row>
    </Container>
  );
};

export default WeightChangeAlert;
