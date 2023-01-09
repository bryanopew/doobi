import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { BtnCTA, BtnText } from "~/styles/styledConsts";
import colors from "~/styles/colors";
import { getUserBaseLine, validateToken } from "~/query/query";
import { NavigationProps } from "~/constants/constants";

const Container = styled.View`
  flex: 1;
  padding: 0px 16px 0px 16px;
`;

const Box = styled.View`
  width: 100%;
  position: absolute;
  bottom: 70px;
  align-self: center;
`;

const TitleText = styled.Text`
  margin-bottom: 70px;
  color: ${colors.textMain};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 35px;
  text-align: center;
`;

const BtnKakaoLogin = styled(BtnCTA)`
  align-self: center;
`;

const BtnTextKakao = styled(BtnText)`
  color: ${colors.textMain};
`;

const Login = ({ navigation: { navigate } }: NavigationProps) => {
  // 실제 로그인. 테스트때만 주석처리
  const signInWithKakao = async (): Promise<void> => {
    // TBD: 서버에 로그인 정보 (!!!닉네임!!!, 키 몸무게 등)있으면 redux-state에 저장 후
    // or 서버말고 asyncStorage에서 확인하고 있으면 redux에 저장 후
    // 바로 메인페이지로 이동시키기
    // TBD: ios 로그인 설정
    const isTokenValid = await validateToken();
    if (isTokenValid) {
      navigate("Stacks", { screen: "FirstInput" });
    }
    //메인페이지 이동
  };

  return (
    <Container>
      <Box>
        <TitleText>{"식단조절은\n두비에게"}</TitleText>
        <BtnKakaoLogin btnStyle="kakao" onPress={signInWithKakao}>
          {/* <BtnKakaoLogin btnStyle="kakao" onPress={getUserBaseLine}> */}
          <BtnTextKakao>카카오 로그인</BtnTextKakao>
        </BtnKakaoLogin>
      </Box>
    </Container>
  );
};

export default Login;
