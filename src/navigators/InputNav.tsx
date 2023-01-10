import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "~/screens/Login";
import styled from "styled-components/native";

import FirstInput from "~/screens/userInputScreen/FirstInput";
import SecondInput from "~/screens/userInputScreen/SecondInput";
import ThirdInput from "~/screens/userInputScreen/ThirdInput";
import AddressEdit from "~/screens/AddressEdit";

const StepIcon = styled.Image`
  width: 36px;
  height: 36px;
`;

const BackArrow = styled.Image`
  width: 24px;
  height: 24px;
`;

const Stack = createNativeStackNavigator();
const InputNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="FirstInput"
        component={FirstInput}
        options={{
          headerTitle: "",
          headerRight: () => (
            <StepIcon source={require("~/assets/icons/36_step1.png")} />
          ),
        }}
      />
      <Stack.Screen
        name="SecondInput"
        component={SecondInput}
        options={{
          headerTitle: "",
          headerRight: () => (
            <StepIcon source={require("~/assets/icons/36_step2.png")} />
          ),
        }}
      />
      <Stack.Screen
        name="ThirdInput"
        component={ThirdInput}
        options={{
          headerTitle: "",
          headerRight: () => (
            <StepIcon source={require("~/assets/icons/36_step3.png")} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default InputNav;
