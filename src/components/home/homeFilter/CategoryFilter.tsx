import React, { useEffect, useRef, useState, Component } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  BtnCTA,
  BtnText,
  Col,
  Container,
  HorizontalLine,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
} from "~/styles/styledConsts";
import colors from "~/styles/colors";

import {
  clickFilter,
  fetchCategoryFilter,
  filterOn,
} from "~/stores/slices/filterSlice";

const CategoryListContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-top-width: 0.5px;
  border-color: ${colors.inActivated};
`;

const CategoryListText = styled.Text`
  font-size: 16px;
  color: ${colors.textMain};
`;
const ClickedCategoryList = styled.Text`
  font-size: 16px;
  color: ${colors.main};
`;

const FilterButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const StyledButton = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  height: 50px
  padding: 15px;
  border-width: 1px;
  border-radius: 4px;
  margin: 5px;
  border-color: ${colors.inActivated};
`;
const ButtonText = styled.Text`
  color: ${colors.textSub};
  font-size: 16px;
`;
const CategoryListButton = styled.TouchableOpacity``;
const getRefreshToken = () => {
  let refreshToken = AsyncStorage.getItem("REFRESH_TOKEN");
  return refreshToken;
};

const CategoryFilter = (children): JSX.Element => {
  const { closeModal } = children;
  const dispatch = useDispatch();
  // const content = useSelector((state: RootState) => {
  //   return state.filter.filterContents;
  // });

  const [data, setData] = useState([]);
  const [btnActive, setBtnActive] = useState("");
  const toggleActive = (e) => setBtnActive(e);

  const category = [
    { id: 1, text: `도시락(${data[0]?.productCnt})`, clicked: true },
    { id: 2, text: `닭가슴살(${data[1]?.productCnt})`, clicked: false },
    { id: 3, text: `샐러드(${data[2]?.productCnt})`, clicked: false },
    { id: 4, text: `영양간식(${data[3]?.productCnt})`, clicked: false },
    { id: 5, text: `과자(${data[4]?.productCnt})`, clicked: false },
    { id: 6, text: `음료(${data[5]?.productCnt})`, clicked: false },
  ];
  console.log(btnActive);
  return (
    <Container>
      <ScrollView>
        {category.map((i, index) => (
          <CategoryListButton
            key={i.id}
            onPress={() => {
              toggleActive(index);
            }}
          >
            <CategoryListContainer
              style={[index === 0 && { borderTopWidth: 0 }]}
            >
              {btnActive === index ? (
                <ClickedCategoryList>{i.text}</ClickedCategoryList>
              ) : (
                <CategoryListText>{i.text}</CategoryListText>
              )}
            </CategoryListContainer>
          </CategoryListButton>
        ))}
        <FilterButtonContainer>
          <StyledButton onPress={() => setBtnActive("")}>
            <ButtonText>카테고리 초기화</ButtonText>
          </StyledButton>
          <StyledButton
            onPress={() => (dispatch(clickFilter(category)), closeModal())}
          >
            <ButtonText>확인</ButtonText>
          </StyledButton>
        </FilterButtonContainer>
      </ScrollView>
    </Container>
  );
};

export default CategoryFilter;
