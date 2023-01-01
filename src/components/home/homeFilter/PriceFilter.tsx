import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import { Slider } from "./slider/Slider";
import { SliderContainer } from "./slider/SliderContainer";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
  },
});

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
const renderBelowKcal = (value: number, index: number) => {
  return (
    <View style={aboveThumbStyles.kcalContainer}>
      <Text>{index}원</Text>
    </View>
  );
};
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
const start = () => {
  console.log("성공");
};
const end = () => {
  console.log("end");
};
const change = () => {
  console.log("change");
};
const PriceFilter = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <SliderContainer caption="가격" sliderValue={[0, 20000]}>
          <Slider
            animateTransitions
            maximumValue={20000}
            minimumTrackTintColor="#590DE1"
            minimumValue={0}
            step={1000}
            thumbTintColor="white"
            renderBelowThumbComponent={renderBelowKcal}
            // renderAboveThumbComponent={renderAboveKcal}
            trackStyle={customTrackStyle.track}
            onSlidingStart={start}
            onSlidingComplete={end}
            onValueChange={change}
          />
        </SliderContainer>
        <FilterButtonContainer>
          <StyledButton>
            <ButtonText>가격 초기화</ButtonText>
          </StyledButton>
          <StyledButton>
            <ButtonText>확인</ButtonText>
          </StyledButton>
        </FilterButtonContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PriceFilter;
