import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import { Slider } from "./slider/Slider";
import { SliderContainer } from "./slider/SliderContainer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const getToken = () => {
  let token = AsyncStorage.getItem("ACCESS_TOKEN");
  return token;
};
const getRefreshToken = () => {
  let refreshToken = AsyncStorage.getItem("REFRESH_TOKEN");
  return refreshToken;
};

const filterRange = () => {
  getRefreshToken()
    .then((refreshToken) =>
      axios.get(
        "http://13.125.244.117:8080/api/member/product/get-product-filter-range/Carb",
        {
          headers: {
            Authentication: `Bearer ${refreshToken}`,
          },
        }
      )
    )
    .then((res) => console.log("filterRange:", res.data));
};
const FilterButtonContainer = styled.View`
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

//하단에 숫자표시 스타일
const aboveThumbStyles = StyleSheet.create({
  gramContainer: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    marginLeft: 2,
  },
  kcalContainer: {
    alignItems: "center",
    height: 20,
    justifyContent: "center",
  },
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
  },
});

//기본 트랙 스타일
const customTrackStyle = StyleSheet.create({
  track: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
  },
  trackOn: {
    borderColor: "#590DE1",
    borderWidth: 1,
  },
});
const renderBelowKcal = (value: number, index: number) => {
  return (
    <View style={aboveThumbStyles.kcalContainer}>
      <Text>{index}kcal</Text>
    </View>
  );
};
const renderAboveKcal = (value: number, index: number) => {
  return (
    <View style={aboveThumbStyles.kcalContainer}>
      <Text>{index}kcal</Text>
    </View>
  );
};
const renderBelowGram = (value: number, index: number) => {
  return (
    <View style={aboveThumbStyles.gramContainer}>
      <Text>{index}g</Text>
    </View>
  );
};

const start = () => {
  console.log("start");
};
const end = () => {
  console.log("end");
};
const change = () => {
  console.log("change");
};
//성공
const NutrientFilter = ({}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <SliderContainer caption="칼로리" sliderValue={[0, 700]}>
          <Slider
            animateTransitions
            maximumValue={700}
            minimumTrackTintColor="#590DE1"
            minimumValue={0}
            step={50}
            thumbTintColor="white"
            renderBelowThumbComponent={renderBelowKcal}
            // renderAboveThumbComponent={renderAboveKcal}
            trackStyle={customTrackStyle.track}
            onSlidingStart={start}
            onSlidingComplete={end}
            onValueChange={change}
          />
        </SliderContainer>
        <SliderContainer caption="탄수화물" sliderValue={[0, 100]}>
          <Slider
            animateTransitions
            maximumTrackTintColor="#E5E5E5"
            maximumValue={100}
            minimumTrackTintColor="#E5E5E5"
            minimumValue={0}
            step={10}
            thumbTintColor="white"
            renderBelowThumbComponent={renderBelowGram}
            trackStyle={customTrackStyle.track}
          />
        </SliderContainer>
        <SliderContainer caption="단백질" sliderValue={[0, 100]}>
          <Slider
            animateTransitions
            maximumTrackTintColor="#E5E5E5"
            maximumValue={100}
            minimumTrackTintColor="#E5E5E5"
            minimumValue={0}
            step={5}
            thumbTintColor="white"
            renderBelowThumbComponent={renderBelowGram}
            trackStyle={customTrackStyle.track}
          />
        </SliderContainer>
        <SliderContainer caption="지방" sliderValue={[0, 100]}>
          <Slider
            animateTransitions
            maximumTrackTintColor="#E5E5E5"
            maximumValue={100}
            minimumTrackTintColor="#E5E5E5"
            minimumValue={0}
            step={2}
            thumbTintColor="white"
            renderBelowThumbComponent={renderBelowGram}
            trackStyle={customTrackStyle.track}
          />
        </SliderContainer>
        <FilterButtonContainer>
          <StyledButton>
            <ButtonText>영양성분 초기화</ButtonText>
          </StyledButton>
          <StyledButton>
            <ButtonText>확인</ButtonText>
          </StyledButton>
        </FilterButtonContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NutrientFilter;
