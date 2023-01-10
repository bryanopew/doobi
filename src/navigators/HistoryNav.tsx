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

const BackArrow = styled.Image`
  width: 24px;
  height: 24px;
`;

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
              <BackArrow source={require(`~/assets/icons/24_back.png`)} />
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
              onPress={() => navigate("HistoryNav", { screen: "History" })}
            >
              <BackArrow source={require(`~/assets/icons/24_back.png`)} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HistoryNav;
