import React, { SetStateAction } from "react";
import { Modal } from "react-native";
import { Text } from "react-native-svg";
import WebView from "react-native-webview";
import styled from "styled-components/native";
import colors from "~/styles/colors";

const Cancel = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  background-color: red;
  position: absolute;
  right: 16px;
  top: 16px;
`;

interface IPaymentWebView {
  uri: string;
  isPaymentModalVisible: boolean;
  setIsPaymentModalVisible: React.Dispatch<SetStateAction<boolean>>;
}
const PaymentWebView = ({
  uri,
  isPaymentModalVisible,
  setIsPaymentModalVisible,
}: IPaymentWebView) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isPaymentModalVisible ? true : false}
    >
      <WebView source={{ uri: uri }} />
      <Cancel onPress={() => setIsPaymentModalVisible(false)}>
        <Text>취소</Text>
      </Cancel>
    </Modal>
  );
};

export default PaymentWebView;
