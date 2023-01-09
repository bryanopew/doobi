import React, { useEffect, useRef, useState, Component } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import { Col, TextMain } from "~/styles/styledConsts";

import DAlert from "~/components/common/DAlert";

const Container = styled.View`
  padding: 0px 16px 24px 16px;
`;

const ResetText = styled(TextMain)`
  font-size: 16px;
`;

const resetAlertContent = () => {
  return (
    <Container>
      <Col style={{ marginTop: 24, marginLeft: 24 }}>
        <ResetText>적용된 필터가 초기화 됩니다</ResetText>
      </Col>
    </Container>
  );
};
const ResetButton = () => {
  const [alertShow, setAlertShow] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setAlertShow(true);
    }, [])
  );
  return (
    <DAlert
      alertShow={alertShow}
      renderContent={() => resetAlertContent()}
      onConfirm={() => setAlertShow(false)}
      onCancel={() => {
        setAlertShow(false);
      }}
    />
  );
};

export default ResetButton;
