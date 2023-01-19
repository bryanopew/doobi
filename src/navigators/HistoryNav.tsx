import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import History from "~/screens/History";
import Order from "~/screens/Order";
import colors from "~/styles/colors";
import { NavigationProps } from "~/constants/constants";
import HistoryDetail from "~/screens/HistoryDetail";
import { TextMain } from "~/styles/styledConsts";
import BackArrow from "~/components/common/BackArrow";

const Stack = createNativeStackNavigator();
const HistoryNav = ({ navigation: { navigate, goBack } }: NavigationProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerShown: true,
          headerTitle: "내 기록",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textMain,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate("BottomTabNav", { screen: "Mypage" })}
            >
              <BackArrow />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetail}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textMain,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate("BottomTabNav", { screen: "Mypage" })}
            >
              <BackArrow />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HistoryNav;
