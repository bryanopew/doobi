import React, { useEffect, useRef, useState, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  SafeAreaView,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import CheckBox from "@react-native-community/checkbox";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
  },
});

const TextContainer = styled.View`
  width: 80%;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;
const FilterButtonContainer = styled.View`
  margin-top: 100px;
  flex-direction: row;
  justify-content: center;
`;
const StyledButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  padding: 15px;
  background-color: white;
  border-width: 1px;
  border-radius: 5px;
  margin: 10px;
  margin-top: 20px;
  border-color: #8f8f8f;
`;
const ButtonText = styled.Text`
  font-weight: bold;
  color: #8f8f8f;
`;
const HeaderText = styled.Text`
  margin-top: 20px;
  font-size: 15px;
  margin-left: 10px;
`;
const CreateDietButton = styled.TouchableOpacity`
  margin-top: 100px;
`;
const CreateDietText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const EachCheckBoxAndroid = () => {
  const [state, setState] = useState(false);
  // const checked = useSelector((state: RootState) => {
  //   return state.checkBox.check;
  // });
  // const cartCheckAll = () => {
  //   setState(!state);
  // };
  // useEffect(() => {
  //   cartCheckAll();
  // }, [checked]);
  return (
    <View style={styles.container}>
      <CheckBox
        value={state}
        onValueChange={(value) => setState(value)}
        tintColors={{ true: "#30D158" }}
      />
    </View>
  );
};

const getToken = () => {
  let token = AsyncStorage.getItem("ACCESS_TOKEN");
  return token;
};
const getRefreshToken = () => {
  let refreshToken = AsyncStorage.getItem("REFRESH_TOKEN");
  return refreshToken;
};
const createDiet = () => {
  getRefreshToken()
    .then((refreshToken) =>
      axios.put("http://13.125.244.117:8080/api/member/diet/create-diet", {
        headers: {
          Authentication: `Bearer ${refreshToken}`,
        },
      })
    )
    .then((res) => console.log("createDiet:", res));
};
const searchDiet = () => {
  getRefreshToken()
    .then((refreshToken) =>
      axios.put("http://13.125.244.117:8080/api/member/diet/list-diet", {
        headers: {
          Authentication: `Bearer ${refreshToken}`,
        },
      })
    )
    .then((res) => console.log("searchDiet:", res));
};
// createDiet();
// searchDiet();
const AutoDietFilter = () => {
  const createAutoDiet = () => {
    getRefreshToken()
      .then((refreshToken) =>
        axios.put(
          "http://61.100.16.155:8080/api/member/product/create-product-auto/DT20220930000000001",
          {
            headers: {
              Authentication: `Bearer ${refreshToken}`,
            },
          }
        )
      )
      .then((res) => console.log(res));
  };
  //   createAutoDiet();
  return (
    <SafeAreaView style={styles.wrapper}>
      <TextContainer>
        <HeaderText>
          현재 끼니 기준으로 목표섭취량을 초과하지 않는 무작위 5개 식품들만
          보여줍니다.
        </HeaderText>
        <CreateDietButton>
          <RowContainer>
            <EachCheckBoxAndroid />
            <CreateDietText>끼니구성 쉽게하기</CreateDietText>
          </RowContainer>
        </CreateDietButton>
      </TextContainer>
      <FilterButtonContainer>
        <StyledButton>
          <ButtonText>끼니구성 초기화</ButtonText>
        </StyledButton>
        <StyledButton>
          <ButtonText>확인</ButtonText>
        </StyledButton>
      </FilterButtonContainer>
    </SafeAreaView>
  );
};

export default AutoDietFilter;
