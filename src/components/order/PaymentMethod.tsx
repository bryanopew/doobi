import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import colors from "~/styles/colors";
import {
  AccordionContentContainer,
  BtnCTA,
  Row,
  TextMain,
} from "~/styles/styledConsts";
import { Controller, useWatch } from "react-hook-form";
import { IFormField, validationRules } from "~/constants/constants";

const KakaoPayBtn = styled(BtnCTA)`
  height: 48px;
  border-color: ${({ isActivated }) =>
    isActivated ? `${colors.kakaoColor}` : `${colors.inActivated}`};
`;
const KakaoPayBtnText = styled(TextMain)`
  font-size: 16px;
  margin-left: 8px;
`;
const KakaoLogo = styled.Image`
  width: 48px;
  height: 20px;
  resize: contain;
`;
const GuideText = styled(TextMain)`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 300;
`;
const BoldText = styled(TextMain)`
  font-size: 14px;
  font-weight: 800;
`;

interface IPaymentMethod {
  control: any;
  setValue: any;
}
const PaymentMethod = ({ control, setValue }: IPaymentMethod) => {
  const paymentMethodValue = useWatch({ control, name: "paymentMethod" });

  const renderKakaoPayBtn = ({ field: { onChange, value } }: IFormField) => {
    return (
      <KakaoPayBtn
        btnStyle="border"
        isActivated={true}
        onPress={() => {
          // setValue("paymentMethod", paymentMethodValue ? "" : "kakao");
        }}
      >
        <Row>
          <KakaoLogo source={require("~/assets/icons/kakaoPay.png")} />
          <KakaoPayBtnText>카카오페이</KakaoPayBtnText>
        </Row>
      </KakaoPayBtn>
    );
  };

  return (
    <AccordionContentContainer>
      <Controller
        control={control}
        name="paymentMethod"
        render={renderKakaoPayBtn}
        rules={validationRules.paymentMethod}
      />

      <GuideText>
        다른 결제수단은 <BoldText>정식출시</BoldText>를 조금만 기다려주세요
      </GuideText>
    </AccordionContentContainer>
  );
};

export default PaymentMethod;
