import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./bottom-tab";
import Stacks from "./userInput-stack";
import HomeStack from "./home-stack";
import FoodList from "~/components/home/FoodList";
import MyPageStacks from "./mypage-stack";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Stacks" component={Stacks} />
      <Stack.Screen name="MyPageStacks" component={MyPageStacks} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default RootStack;
