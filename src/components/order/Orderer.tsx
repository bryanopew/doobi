import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
  AccordionContentContainer,
  ErrorBox,
  ErrorText,
  InputHeaderText,
  UserInfoTextInput,
} from "~/styles/styledConsts";
import { Controller } from "react-hook-form";
import { IFormField, validationRules } from "~/constants/constants";
import styled from "styled-components/native";

const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
const Input = styled(UserInfoTextInput)``;

interface IAddress {
  control: any;
  handleSubmit: Function;
  errors: any;
}
const Orderer = ({ control, handleSubmit, errors }: IAddress) => {
  const renderOrdererInput = ({ field: { onChange, value } }: IFormField) => {
    return (
      <>
        <InputHeader
          style={{ marginTop: 0 }}
          isActivated={value ? true : false}
        >
          주문자
        </InputHeader>
        <Input
          placeholder={`주문자`}
          value={value}
          onChangeText={onChange}
          isActivated={value ? true : false}
          keyboardType="default"
        />
      </>
    );
  };
  const renderOrdererContactInput = ({
    field: { onChange, value },
  }: IFormField) => {
    return (
      <>
        <InputHeader isActivated={value ? true : false}>휴대전화</InputHeader>
        <Input
          placeholder={`휴대전화`}
          value={value}
          onChangeText={onChange}
          isActivated={value ? true : false}
          keyboardType="number-pad"
        />
      </>
    );
  };
  return (
    <AccordionContentContainer>
      {/* orderer */}
      <Controller
        control={control}
        render={(field) => renderOrdererInput(field)}
        name={"orderer"}
        rules={validationRules.orderer}
      />
      {errors.orderer && (
        <ErrorBox>
          <ErrorText>{errors.orderer.message}</ErrorText>
        </ErrorBox>
      )}
      {/* ordererContact */}
      <Controller
        control={control}
        render={(field) => renderOrdererContactInput(field)}
        name={"ordererContact"}
        rules={validationRules.ordererContact}
      />
      {errors.ordererContact && (
        <ErrorBox>
          <ErrorText>{errors.ordererContact.message}</ErrorText>
        </ErrorBox>
      )}
    </AccordionContentContainer>
  );
};

export default Orderer;
