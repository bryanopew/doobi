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
} from "react-native";
import Styled from "styled-components/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CategoryFilter from "~/components/home/homeFilter/CategoryFilter";
import NutrientFilter from "~/components/home/homeFilter/NutrientFilter";
import PriceFilter from "~/components/home/homeFilter/PriceFilter";
import AutoDietFilter from "~/components/home/homeFilter/AutoDietFilter";

const Tab = createMaterialTopTabNavigator();

const MenuFilterScreenStack = (props) => {
  const { index, onPress } = props;

  const userClick = () => {
    if (index === 0) {
      return "카테고리";
    } else if (index === 1) {
      return "영양성분";
    } else if (index === 2) {
      return "가격";
    } else if (index === 3) {
      return "식단구성";
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: [{ fontSize: 15 }, { fontWeight: "bold" }],
        tabBarIndicatorStyle: false,
      }}
      initialRouteName={userClick()}
    >
      <Tab.Screen
        name="카테고리"
        children={({ navigation }) => (
          <CategoryFilter navigation={navigation} closeModal={onPress} />
        )}
      />
      <Tab.Screen name="영양성분" component={NutrientFilter} />
      <Tab.Screen name="가격" component={PriceFilter} />
      <Tab.Screen name="식단구성" component={AutoDietFilter} />
    </Tab.Navigator>
  );
};

export default MenuFilterScreenStack;
