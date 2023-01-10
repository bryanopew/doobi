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
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions } from "@react-navigation/native";
import styled from "styled-components/native";

import Home from "~/screens/homeScreen/Home";
import FoodDetail from "~/screens/foodDetailScreen/FoodDetail";
import FoodList from "~/components/home/FoodList";
import MenuFilterModal from "~/components/home/homeFilter/HomeFilter";

const Stack = createNativeStackNavigator();
const BasketIcon = styled.Image`
  width: 36px;
  height: 36px;
`;
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FoodDetail"
        component={FoodDetail}
        options={{
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                console.log("카트페이지로 이동");
              }}
            >
              <BasketIcon source={require("~/assets/icons/36_cartPage.png")} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="HomeFilter" component={MenuFilterModal} />
    </Stack.Navigator>
  );
};

export default HomeStack;
