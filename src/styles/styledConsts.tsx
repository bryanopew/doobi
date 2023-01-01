import styled from "styled-components/native";
import colors from "./colors";
import { Dimensions } from "react-native";
import { SCREENWIDTH } from "~/constants/constants";

export interface StyledProps {
  isActivated?: boolean;
  btnStyle?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export const Container = styled.View`
  flex: 1;
  padding: 0px 16px 0px 16px;
  background-color: ${colors.white};
`;

export const InputHeaderText = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: ${({ isActivated }: StyledProps) =>
    isActivated ? colors.main : colors.white};
`;
export const UserInfoTextInput = styled.TextInput`
  justify-content: center;
  align-items: flex-start;
  font-weight: normal;
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${({ isActivated }: StyledProps) =>
    isActivated ? colors.main : colors.inActivated};
`;

export const InputHeader = styled(InputHeaderText)`
  margin-top: 24px;
`;
export const Input = styled(UserInfoTextInput)``;

export const ErrorText = styled.Text`
  font-size: 16px;
  color: #ffffff;
`;
export const ErrorBox = styled.View`
  position: relative;
  width: auto;
  height: 24px;
  margin-top: 4px;
  margin-bottom: -28px;
  padding: 0px 10px 0px 10px;
  background-color: ${colors.warning};
  border-radius: 3px;
  align-self: flex-end;
  opacity: 0.9;
  z-index: 1;
`;

export const AccordionContentContainer = styled.View`
  /* width: ${`${SCREENWIDTH}px`}; */
  width: 100%;
  height: auto;
  background-color: ${colors.white};
  padding: 0px 16px 32px 16px;
`;

export const InputContainer = styled.View`
  width: 100%;
  height: 58px;
  padding-top: 24px;
`;

export const TextMain = styled.Text`
  color: ${colors.textMain};
`;

export const TextSub = styled.Text`
  color: ${colors.textSub};
  font-weight: 300;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Col = styled.View``;

export const Seperator = styled.View`
  height: 16px;
`;

/** props 1. btnStyle -> "activated" | "inactivated" | "border" | "borderActivated" | "kakao"
 *  props 2. height -> height: ${p => p.height ?? 52}px
 *  props 3. width -> width: ${p => p.width ?? `${SCREENWIDTH - 32}`}px;
 */
export const BtnCTA = styled.TouchableOpacity`
  height: ${({ height }: StyledProps) => (height ? `${height}px` : "52px")};
  /* width: ${({ width }: StyledProps) => width ?? `${SCREENWIDTH - 32}px`}; */
  width: 100%;
  border-radius: 4px;
  background-color: ${({ btnStyle }: StyledProps) =>
    btnStyle == "activated"
      ? `${colors.main}`
      : btnStyle == "inactivated"
      ? `${colors.inActivated}`
      : btnStyle == "border"
      ? `${colors.white}`
      : btnStyle == "kakao"
      ? `${colors.kakaoColor}`
      : `${colors.white}`};
  align-items: center;
  justify-content: center;
  border-width: ${({ btnStyle }: StyledProps) =>
    btnStyle == "border" || btnStyle == "borderActivated" ? "1px" : "0px"};
  border-color: ${({ btnStyle }: StyledProps) =>
    btnStyle == "border"
      ? colors.inActivated
      : btnStyle == "borderActivated"
      ? colors.main
      : colors.white};
`;

export const BtnBottomCTA = styled(BtnCTA)`
  align-self: center;
  margin-top: -60px;
  margin-bottom: 8px;
  elevation: 8;
`;

/** props1. isActivated -> boolean */
export const BtnSmall = styled.TouchableOpacity`
  height: 32px;
  width: 74px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ isActivated }: StyledProps) =>
    isActivated ? colors.inActivated : colors.white};
  border-width: 1px;
  border-color: ${colors.inActivated};
`;

export const BtnText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`;

/** props1. isActivated -> boolean */
export const BtnSmallText = styled.Text`
  font-size: 14px;
  color: ${({ isActivated }: StyledProps) =>
    isActivated ? colors.textMain : colors.textSub};
`;

export const VerticalLine = styled.View`
  height: 100%;
  width: 1px;
  background-color: ${colors.inActivated};
`;
export const HorizontalLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${colors.inActivated};
`;

/** props1. height  */
export const HorizontalSpace = styled.View`
  width: 100%;
  height: ${({ height }: StyledProps) => `${height}px`};
  /* background-color: ${colors.white}; */
`;

/** props1. width */
export const VerticalSpace = styled.View`
  height: 100%;
  width: ${({ width }: StyledProps) => `${width}px`};
  background-color: ${colors.white};
`;
