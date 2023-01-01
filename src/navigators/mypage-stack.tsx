import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import History from "~/screens/History";
import Orders from "~/screens/Order";
import colors from "~/styles/colors";
import { NavigationProps } from "~/constants/constants";

const BackArrow = styled.Image`
  width: 24px;
  height: 24px;
`;

const Stack = createNativeStackNavigator();
const MyPageStacks = ({ navigation: { navigate } }: NavigationProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Hitory"
        component={History}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: true,
          headerTitle: "주문 / 결제",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textMain,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate("BottomTab", { screen: "Cart" })}
            >
              <BackArrow source={require(`~/assets/icons/24_back.png`)} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MyPageStacks;
