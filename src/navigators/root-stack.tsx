import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./bottom-tab";
import InputNav from "./userInput-stack";
import HomeStack from "./home-stack";
import FoodList from "~/components/home/FoodList";
import MyPageStacks from "./mypage-stack";
import Login from "~/screens/Login";
import FoodDetail from "~/screens/foodDetailScreen/FoodDetail";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="InputNav" component={InputNav} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      {/* <Stack.Screen name="OrderNav" component={OrderNav} /> */}
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
      {/* <Stack.Screen name="HistroyNav" component={HistroyNav} /> */}
      {/* <Stack.Screen name="PaymentHistroyNav" component={PaymentHistroyNav} /> */}
      <Stack.Screen name="MyPageStacks" component={MyPageStacks} />
    </Stack.Navigator>
  );
};

export default RootStack;
