import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Order from "~/screens/Order";
import colors from "~/styles/colors";
import styled from "styled-components/native";
import { NavigationProps } from "~/constants/constants";
import AddressEdit from "~/screens/AddressEdit";

const BackArrow = styled.Image`
  width: 24px;
  height: 24px;
`;

const Stack = createNativeStackNavigator();

const OrderNav = ({ navigation: { navigate } }: NavigationProps) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order"
        component={Order}
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
              onPress={() => navigate("BottomTabNav", { screen: "Cart" })}
            >
              <BackArrow source={require(`~/assets/icons/24_back.png`)} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddressEdit"
        component={AddressEdit}
        options={{
          headerTitle: "배송지 수정",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigate("OrderNav", {
                  screen: "Order",
                  params: { from: "AddressEdit" },
                })
              }
            >
              <BackArrow source={require(`~/assets/icons/24_back.png`)} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderNav;
