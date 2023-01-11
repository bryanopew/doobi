import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNav from "./BottomTabNav";
import InputNav from "./InputNav";
import HistoryNav from "./HistoryNav";
import Login from "~/screens/Login";
import FoodDetail from "~/screens/foodDetailScreen/FoodDetail";
import OrderNav from "./OrderNav";

const Stack = createNativeStackNavigator();

const RootStackNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="InputNav" component={InputNav} />
      <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
      <Stack.Screen name="OrderNav" component={OrderNav} />
      <Stack.Screen name="HistoryNav" component={HistoryNav} />
      {/* <Stack.Screen name="PaymentHistroyNav" component={PaymentHistroyNav} /> */}
    </Stack.Navigator>
  );
};

export default RootStackNav;
