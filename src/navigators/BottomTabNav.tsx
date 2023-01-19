import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Mypage from "~/screens/Mypage";
import Likes from "~/screens/Likes";
import Cart from "~/screens/Cart";
import colors from "~/styles/colors";

import HomeStack from "./home-stack";
import BackArrow from "~/components/common/BackArrow";

const Tab = createBottomTabNavigator();

const BottomTabIcon = styled.Image`
  width: 36px;
  height: 36px;
`;

const BottomTabNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <BottomTabIcon
                source={require(`~/assets/icons/36_mainPage_selected.png`)}
              />
            ) : (
              <BottomTabIcon
                source={require(`~/assets/icons/36_mainPage.png`)}
              />
            ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <BottomTabIcon
                source={require(`~/assets/icons/36_profilePage_selected.png`)}
              />
            ) : (
              <BottomTabIcon
                source={require(`~/assets/icons/36_profilePage.png`)}
              />
            ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Likes"
        component={Likes}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <BottomTabIcon
                source={require(`~/assets/icons/36_likePage_selected.png`)}
              />
            ) : (
              <BottomTabIcon
                source={require(`~/assets/icons/36_likePage.png`)}
              />
            ),
          tabBarShowLabel: false,

          headerShown: true,
          headerTitle: "찜한 상품",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textMain,
          },
          headerLeft: () => <BackArrow />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <BottomTabIcon
                source={require(`~/assets/icons/36_cartPage_selected.png`)}
              />
            ) : (
              <BottomTabIcon
                source={require(`~/assets/icons/36_cartPage.png`)}
              />
            ),
          tabBarShowLabel: false,

          headerShown: true,
          headerTitle: "장바구니",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textMain,
          },
          headerLeft: () => <BackArrow />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
