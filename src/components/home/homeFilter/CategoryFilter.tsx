import React, { useEffect, useRef, useState, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
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

import {
  clickFilter,
  fetchCategoryFilter,
  filterOn,
} from "~/stores/slices/filterSlice";
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
  },
  disabledText: {
    alignItems: "center",
    color: "grey",
  },
  text: {
    alignItems: "center",
    color: "#590DE1",
  },
  clicked: {
    backgroundColor: "blue",
  },
  offClicked: {
    backgroundColor: "green",
  },
});
const CategoryListContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 12px;
  border-top-width: 0.5px;
  border-color: grey;
`;

const CategoryListText = styled.Text`
  margin-top: 12px;
  font-size: 15px;
  font-weight: bold;
  color: #444444;
`;
const ClickedCategoryList = styled.Text`
  margin-top: 12px;
  font-size: 15px;
  font-weight: bold;
  color: #590de1;
`;

const FilterButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

// const ButtonContainer = styled.View`
//   flex: 1;
//   border: 0.5px grey;
//   border-radius: 10px;
//   align-items: center;
//   margin: 10px;
// `;
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
const CategoryListButton = styled.TouchableOpacity``;
const getRefreshToken = () => {
  let refreshToken = AsyncStorage.getItem("REFRESH_TOKEN");
  return refreshToken;
};

const CategoryList = (props) => {
  const { list, clickListener } = props;
  const [clicked, setClicked] = useState(false);
  const onClick = () => {
    setClicked(!clicked);
    clickListener(list.id);
  };
  return (
    <CategoryListButton
      onPress={() => {
        onClick();
      }}
    >
      <CategoryListContainer>
        {clicked ? (
          <ClickedCategoryList>{list.text}</ClickedCategoryList>
        ) : (
          <CategoryListText>{list.text}</CategoryListText>
        )}
      </CategoryListContainer>
    </CategoryListButton>
  );
};

const CategoryFilter = (children): JSX.Element => {
  const { closeModal } = children;
  const dispatch = useDispatch();
  // const content = useSelector((state: RootState) => {
  //   return state.filter.filterContents;
  // });

  const [data, setData] = useState([]);

  const toggleFilter = (i) => {
    return [...category, (category[i].clicked = !category[i].clicked)];
  };

  const cntBoxData = async () => {
    await getRefreshToken()
      .then((refreshToken) =>
        axios.get(
          "http://13.125.244.117:8080/api/member/category/list-category-product-cnt/CG",
          {
            headers: {
              Authentication: `Bearer ${refreshToken}`,
            },
          }
        )
      )
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    cntBoxData();
  }, []);

  const category = [
    { id: 1, text: `도시락(${data[0]?.productCnt})`, clicked: false },
    { id: 2, text: `닭가슴살(${data[1]?.productCnt})`, clicked: false },
    { id: 3, text: `샐러드(${data[2]?.productCnt})`, clicked: false },
    { id: 4, text: `영양간식(${data[3]?.productCnt})`, clicked: false },
    { id: 5, text: `과자(${data[4]?.productCnt})`, clicked: false },
    { id: 6, text: `음료(${data[5]?.productCnt})`, clicked: false },
  ];

  const onPress = (i) => {
    switch (i.id) {
      case 1:
        // dispatch(fetchCategoryFilter());
        console.log("도시락");
        toggleFilter(0);

        break;
      case 2:
        console.log("닭가슴살");
        toggleFilter(1);
        break;
      case 3:
        console.log("샐러드");
        toggleFilter(2);
        break;
      case 4:
        console.log("영양간식");
        toggleFilter(3);

        break;
      case 5:
        console.log("과자");
        toggleFilter(4);

        break;
      case 6:
        console.log("음료");
        toggleFilter(5);

        break;
      default:
        return;
    }
  };
  const clickListener = (i) => {
    toggleFilter(i - 1);
  };

  return (
    <ScrollView style={styles.wrapper}>
      {category.map((i, index) => (
        // <CategoryListButton
        //   key={i.id}
        //   onPress={() => {
        //     onPress(i);
        //     console.log(i);
        //   }}>
        //   <CategoryListContainer style={[index === 0 && {borderTopWidth: 0}]}>
        //     {i.clicked ? (
        //       <CategoryListText>{i.text}</CategoryListText>
        //     ) : (
        //       <ClickedCategoryList>{i.text}</ClickedCategoryList>
        //     )}
        //   </CategoryListContainer>
        // </CategoryListButton>
        <CategoryList key={index} list={i} clickListener={clickListener} />
      ))}
      <FilterButtonContainer>
        <StyledButton onPress={() => console.log("category:", category)}>
          <ButtonText>카테고리 초기화</ButtonText>
        </StyledButton>
        <StyledButton
          onPress={() => (dispatch(clickFilter(category)), closeModal())}
        >
          <ButtonText>확인</ButtonText>
        </StyledButton>
      </FilterButtonContainer>
    </ScrollView>
  );
};

export default CategoryFilter;
