import React, { useEffect, useRef, useState, Component } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import {
  Col,
  HorizontalLine,
  HorizontalSpace,
  Row,
  TextMain,
  TextSub,
  VerticalLine,
} from "~/styles/styledConsts";
import colors from "~/styles/colors";

import CategoryFilter from "~/components/home/homeFilter/CategoryFilter";
import NutrientFilter from "~/components/home/homeFilter/NutrientFilter";
import PriceFilter from "~/components/home/homeFilter/PriceFilter";
import AutoDietFilter from "~/components/home/homeFilter/AutoDietFilter";
import ResetButton from "~/components/home/homeFilter/ResetFilter";

const Tab = createMaterialTopTabNavigator();

const Reset = styled.Image`
  width: 24px;
  height: 24px;
  margin-top: 16px;
`;
const FilterOn = styled.Image`
  margin-top: 20px;
  width: 10px;
  height: 10px;
`;
const ResetIcon = () => {
  return <Reset source={require(`~/assets/icons/24_filterInitialize.png`)} />;
};

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
      return "끼니구성";
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [{ elevation: 0 }],
        tabBarLabelStyle: [
          { fontSize: 15 },
          { fontWeight: "bold" },
          { width: 200 },
        ],
        tabBarInactiveTintColor: colors.textSub,
        tabBarActiveTintColor: colors.black,
        tabBarIndicatorStyle: { display: "none" },
      }}
      initialRouteName={userClick()}
    >
      <Tab.Screen
        name="카테고리"
        children={({ navigation }) => (
          <CategoryFilter navigation={navigation} closeModal={onPress} />
        )}
        options={{
          tabBarBadge: () => {
            return (
              <FilterOn source={require(`~/assets/icons/24_icon=filter.png`)} />
            );
          },
        }}
      />
      <Tab.Screen name="영양성분" component={NutrientFilter} />
      <Tab.Screen name="가격" component={PriceFilter} />
      <Tab.Screen name="식단구성" component={AutoDietFilter} />
      <Tab.Screen
        options={{
          tabBarIcon: () => <ResetIcon />,
          tabBarShowLabel: false,
          tabBarIconStyle: { marginBottom: 29, marginRight: 20 },
        }}
        name="초기화"
        component={ResetButton}
      />
    </Tab.Navigator>
  );
};

export default MenuFilterScreenStack;
