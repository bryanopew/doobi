import { View, Text, Modal, ScrollView } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { StyledProps } from "~/styles/styledConsts";
import { SCREENWIDTH } from "~/constants/constants";
import colors from "~/styles/colors";

const ModalBackGround = styled.TouchableOpacity`
  flex: 1;
  background-color: #000000a6;
  justify-content: flex-end;
`;

const PopUpContainer = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  padding: 0px 16px 16px 16px;
  align-items: center;
  background-color: ${({ backgroundColor }: StyledProps) =>
    backgroundColor ? backgroundColor : colors.white};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const PopupIndicator = styled.View`
  margin-top: 8px;
  width: 64px;
  height: 4px;
  background-color: ${colors.black};
  border-radius: 5px;
`;

const ContentContainer = styled.View`
  width: 100%;
`;

interface IDBottomSheet {
  alertShow: boolean;
  setAlertShow: React.Dispatch<React.SetStateAction<boolean>>;
  renderContent: () => React.ReactElement;
  onCancel: Function;
}
const DBottomSheet = ({
  alertShow,
  setAlertShow,
  renderContent,
  onCancel,
}: IDBottomSheet) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={alertShow ? true : false}
      onRequestClose={() => {
        onCancel ? onCancel() : null;
      }}
    >
      <ModalBackGround
        onPress={() => {
          setAlertShow(false);
        }}
      >
        <PopUpContainer activeOpacity={1}>
          <PopupIndicator />
          <ContentContainer>{renderContent()}</ContentContainer>
        </PopUpContainer>
      </ModalBackGround>
    </Modal>
  );
};

export default DBottomSheet;
