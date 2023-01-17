import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentDetail from "~/screens/PaymentDetail";
import PaymentHistory from "~/screens/PaymentHistory";

const Stack = createNativeStackNavigator();

const PaymentHistoryNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="PaymentHistory" component={PaymentDetail} />
    </Stack.Navigator>
  );
};

export default PaymentHistoryNav;
