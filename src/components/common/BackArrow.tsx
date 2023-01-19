import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Back = styled.Image`
  width: 24px;
  height: 24px;
`;

const BackArrow = () => {
  return <Back source={require(`~/assets/icons/24_back.png`)} />;
};

export default BackArrow;
